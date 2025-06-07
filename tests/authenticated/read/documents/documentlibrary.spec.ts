import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";

test.use({
  reademail: process.env.READEMAIL,
  readpassword: process.env.READPASSWORD,
});

/* eslint-disable prettier/prettier */
test("Verify Document Library", async ({
  page,
  baseURL,
  reademail,
  readpassword,
}) => {
  await login(reademail, readpassword)({ page });

  const documentLibraryButton = page.locator("text=Document Library").nth(0);
  await expect(documentLibraryButton).toBeVisible();
  await documentLibraryButton.click();

  await page.waitForURL(/documents/);

  await expect(page.locator("text=Documents").nth(0)).toBeVisible();
  await expect(page.locator("text=Table of Contents").nth(0)).toBeVisible();
  await expect(
    page.locator("text=Select a Document to View or Edit"),
  ).toBeVisible();
  await expect(page.locator("text=Store Documents Offline")).toBeVisible();
  await expect(page.locator("input[type=\"checkbox\"]")).toBeVisible();
  await expect(page.locator("text=Add Your First Folder")).not.toBeVisible();
});
