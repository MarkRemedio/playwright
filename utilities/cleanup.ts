import admin, { credential } from "firebase-admin";
import { initializeFirestore } from "firebase-admin/firestore";

// constants
import {
  ORGANIZATIONS_COLLECTION,
  getOrgPath,
} from "wombat-global/src/constants";

// utilities
import { elasticSearchClient } from "./elastic-search-client";
import { getOrgDocPath } from "wombat-global/src/constants/firebase/paths";

// types
import { BulkWriter } from "@google-cloud/firestore";
import { OrganizationEntity, TenantEntity } from "wombat-global/src/typings";
import { WombatRegions } from "wombat-global/src/typings/multi-region";

const projectId =
  process.env.GCLOUD_PROJECT ||
  process.env.FIREBASE_PROJECT ||
  "wombat-development";

const credentials = process.env.CI
  ? // eslint-disable-next-line @typescript-eslint/no-var-requires
    credential.applicationDefault()
  : credential.applicationDefault();

async function removeIndex(template: string, region: WombatRegions = "us") {
  const client = await elasticSearchClient({ region });
  const targets = await client.cat.aliases({
    format: "JSON",
    name: template,
  });
  try {
    await Promise.all(
      targets.map(async (indx) => {
        if (indx.index) {
          await client.indices.delete({ index: indx.index });
        }
        return;
      }),
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function removeUserById(
  bulkWriter: BulkWriter,
  options?: { ignoreErrors?: boolean },
) {
  return async function removeUserByIdInnerHandler(userId: string) {
    if (!admin.apps.length) {
      const app = admin.initializeApp({
        projectId,
        credential: credentials,
      });
      initializeFirestore(app, { preferRest: true });
    }

    try {
      const path = admin.firestore().doc(`users/${userId}`);
      await admin.firestore().recursiveDelete(path, bulkWriter);
      return;
    } catch (err) {
      if (!options?.ignoreErrors) {
        // eslint-disable-next-line no-console
        console.log(err);
        // throw err
      }
    }
  };
}

export async function destroyOrganization(orgId: string) {
  try {
    if (!admin.apps.length) {
      const app = admin.initializeApp({
        projectId,
        credential: credentials,
      });
      initializeFirestore(app, { preferRest: true });
    }

    const orgPath = admin
      .firestore()
      .doc(`${ORGANIZATIONS_COLLECTION}/${orgId}`);
    const [orgs, tenants] = await Promise.all([
      admin
        .firestore()
        .doc(getOrgDocPath(orgId))
        .get()
        .then((d) => d.data() as OrganizationEntity | undefined),
      admin
        .firestore()
        .collection(`${getOrgPath(orgId)}/tenants`)
        .get(),
    ]);

    let userIds = Object.keys({
      ...(orgs?.users.activeUsers || {}),
      ...(orgs?.users.inactiveUsers || {}),
    });

    tenants.docs.forEach((tenantDoc) => {
      const tenant = tenantDoc.data() as TenantEntity | undefined;
      userIds = [
        ...userIds,
        ...Object.keys({
          ...(tenant?.users.activeUsers || {}),
          ...(tenant?.users.inactiveUsers || {}),
        }),
      ];
    });

    const bulkWriter = admin.firestore().bulkWriter();
    bulkWriter.onWriteError((error) => {
      if (error.failedAttempts < 3) {
        // eslint-disable-next-line no-console
        console.log(error);
        return true;
      } else {
        // eslint-disable-next-line no-console
        console.log("Failed write at document: ", error.documentRef.path);
        return false;
      }
    });

    await admin.auth().deleteUsers(userIds);
    await Promise.all(userIds.map(removeUserById(bulkWriter)));
    await admin.firestore().recursiveDelete(orgPath, bulkWriter);

    await removeIndex(`user-collection-${orgId.toLocaleLowerCase()}`);
    await removeIndex(`user-collection-${orgId.toLocaleLowerCase()}-*`);
    await removeIndex(`user-collection-${orgId.toLocaleLowerCase()}_*`);

    await removeIndex(`training-collection-${orgId.toLocaleLowerCase()}`);
    await removeIndex(`training-collection-${orgId.toLocaleLowerCase()}-*`);
    await removeIndex(`training-collection-${orgId.toLocaleLowerCase()}_*`);

    await removeIndex(`object-collection-${orgId.toLocaleLowerCase()}`);
    await removeIndex(`object-collection-${orgId.toLocaleLowerCase()}-*`);
    await removeIndex(`object-collection-${orgId.toLocaleLowerCase()}_*`);
    return;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
