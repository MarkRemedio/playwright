import { FullConfig, chromium } from "@playwright/test";

import register from "./utilities/register";
import addUser from "./utilities/add-user";
import login from "./utilities/login";

import {
  orgAdmin,
  tenantAdmin,
  tenantManageDocumentsUser,
  tenantManagePeopleUser,
  tenantQueryUsersUser,
  tenantManageFormsUser,
  tenantReadUser,
} from "./tests/constants";
import { destroyOrganization } from "./utilities/cleanup";

const target = { orgId: orgAdmin.orgId, tenantId: orgAdmin.orgId };

async function globalSetup(_config: FullConfig) {
  await destroyOrganization(orgAdmin.orgId);

  const baseURL = process.env.BASE_URL || "https://wombat-development.web.app";
  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL });
  await context.tracing.start({ screenshots: true, snapshots: true });
  try {
    let page = await context.newPage();
    await register(orgAdmin)({ page });
    await page.close();

    /**
     *
     * YES ALL OF THESE PAGE CLOSES OPENS ARE NEEDED.
     * I HAVE NO IDEA WHY. ITS AWFUL
     */
    page = await context.newPage();
    await login(orgAdmin.email, orgAdmin.password)({ page });
    await page.goto(`/o/${target.orgId}/t/${target.tenantId}/people`);
    await addUser({ ...tenantReadUser, ...target })({ page });
    await page.close();

    page = await context.newPage();
    await page.goto(`/o/${target.orgId}/t/${target.tenantId}/people`);
    await addUser({ ...tenantAdmin, ...target })({ page });
    await page.close();

    page = await context.newPage();
    await page.goto(`/o/${target.orgId}/t/${target.tenantId}/people`);
    await addUser({ ...tenantManagePeopleUser, ...target })({ page });
    await page.close();

    page = await context.newPage();
    await page.goto(`/o/${target.orgId}/t/${target.tenantId}/people`);
    await addUser({ ...tenantManageFormsUser, ...target })({ page });
    await page.close();

    page = await context.newPage();
    await page.goto(`/o/${target.orgId}/t/${target.tenantId}/people`);
    await addUser({ ...tenantManageDocumentsUser, ...target })({ page });
    await page.close();

    page = await context.newPage();
    await page.goto(`/o/${target.orgId}/t/${target.tenantId}/people`);
    await addUser({ ...tenantQueryUsersUser, ...target })({ page });

    await browser.close();
  } catch (error) {
    await context.tracing.stop({
      path: "./test-results/failed-setup-trace.zip",
    });
    await browser.close();
    throw error;
  }
}

export default globalSetup;
