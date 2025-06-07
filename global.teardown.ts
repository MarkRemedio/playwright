import { orgAdmin } from "./tests/constants";
import { destroyOrganization } from "./utilities/cleanup";

async function globalTeardown() {
  await destroyOrganization(orgAdmin.orgId);
}

export default globalTeardown;
