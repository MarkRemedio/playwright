import { test, expect } from "@playwright/test";

/* eslint-disable quotes, prettier/prettier */
test(`I should be able to access Wombat Support/Knowledge Center - 
  I should be able to access the Wombat Website -  
  I should be able to access the Main Login Screen - 
  I should be able to access the Wombat Support/Knowledge Center`, async ({ page, baseURL }) => {
  await page.goto(baseURL + "/login");
  await expect(page.getByRole("link", { name: "get help" })).toBeVisible();
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "get help" }).click();
  const page1 = await page1Promise;
  await expect(
    page1.getByRole("heading", { name: "Welcome to the Wombat Help" }),
  ).toBeVisible();
  await page1.getByRole("link", { name: "Log in", exact: true }).click();
  await expect(page1).toHaveURL(/login/);

  await page.goto("https://www.wombat.software/");
  await expect(page.getByRole("link", { name: "Support" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
  const page2Promise = page.waitForEvent("popup", { timeout: 50000 });
  await page.getByRole("link", { name: "Support" }).click();
  const page2 = await page2Promise;
  await expect(
    page2.getByRole("heading", { name: "Welcome to the Wombat Help" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Login" }).click({
    button: "right",
  });
  const page3Promise = page.waitForEvent("popup", { timeout: 50000 });
  await page.getByRole("link", { name: "Login" }).click();
  const page3 = await page3Promise;
  await expect(page3.getByRole("heading", { name: "Sign In" })).toBeVisible({
    timeout: 50000,
  });
});
