import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";

test.use({
  reademail: process.env.READEMAIL,
  readpassword: process.env.READPASSWORD,
});

test("i should be able to navigate to the forms library", async ({
  page,
  baseURL,
  reademail,
  readpassword,
}) => {
  await login(reademail, readpassword)({ page });

  const formsLibraryButton = await page.locator("text=Forms Library").nth(0);
  await expect(formsLibraryButton).toBeVisible();
  await formsLibraryButton.click();

  await page.waitForURL(/forms-library/);

  await expect(page.locator("text=Forms Library").nth(1)).toBeVisible();
  await expect(page.locator("text=Folders")).toBeVisible();
  await expect(page.locator("text=Favorites")).toBeVisible();
  await expect(page.locator("text=Add New")).not.toBeVisible();
  await expect(page.locator("text=Add New Folder")).not.toBeVisible();
});
