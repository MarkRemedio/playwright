import { test, expect } from "@playwright/test";
import { fakeClient, tenantReadUser } from "tests/constants";
import login from "../../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test("i should be able to toggle some system settings", async ({ page, baseURL }) => {
  await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });

  const shortCode = process.env.ADMINSHORTCODE!;
  await expect(page).toHaveURL(new RegExp(shortCode));
  const home = await page.locator("text=Home");
  await expect(home).toBeVisible();

  await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!);
  const todoTxt = await page.locator("text=My To Do List");
  await expect(todoTxt).toBeVisible();

  const adminButton = page.locator('text=Admin');
  await expect(adminButton).toBeVisible({ timeout: 100000 });
  await adminButton.click();

  await page.waitForURL(/admin/);
});
