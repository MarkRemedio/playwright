import { test, expect } from "@playwright/test";
import { fakeClient, tenantReadUser } from "tests/constants";
import login from "../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test("i should be able to toggle some system settings", async ({ page, baseURL }) => {
  await login(process.env.STAFFEMAIL!, process.env.STAFFPASSWORD!)({ page });

  const home = await page.locator("text=Home");
  await expect(home).toBeVisible();

  await expect(page.locator('[data-test="drawer-action-name"]')).toContainText('MarkTest');

  await page.goto(baseURL + '/o/JOT-CONSULTING');
  await page.waitForURL(/JOT-CONSULTING/);
  await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
  await expect(page.locator('[data-test="drawer-action-name"]')).toContainText('jot consulting');

  await page.goto(baseURL + '/o/ORG-1');
  await page.waitForURL(/ORG-1/);
  await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
  await expect(page.locator('[data-test="drawer-action-name"]')).toBeVisible;

  
});
