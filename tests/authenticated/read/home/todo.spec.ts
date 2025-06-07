import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";

test.use({
  reademail: process.env.READEMAIL,
  readpassword: process.env.READPASSWORD,
});

/* eslint-disable prettier/prettier */
test("Verify Home Page UI elements", async ({
  page,
  baseURL,
  reademail,
  readpassword,
}) => {
  await login(reademail, readpassword)({ page });

  const viewHistoryButton = page.locator("text=View History");
  await expect(viewHistoryButton).toBeVisible();
  await viewHistoryButton.click();

  await page.waitForURL(/history=true/);

  await expect(page.locator("text=Filter by Type")).toBeVisible();
  await expect(page.locator("text=Filter by Person")).not.toBeVisible();
  const allUsersFilterButton = page.locator("[aria-label=\"All users\"]");
  const unassignedUsersFilterButton = page.locator("[aria-label=\"Unassigned\"]");
  // const unassignedUsersFilterButton = page.locator('[aria-label="Unassigned"]');
  await expect(allUsersFilterButton).not.toBeVisible();
  await expect(unassignedUsersFilterButton).not.toBeVisible();

  const formFilterButton = await page.locator("[aria-label=\"Forms\"]");
  await expect(formFilterButton).toBeVisible();
  await formFilterButton.click();

  const trainingFilterButton = await page.locator(
    "[aria-label=\"Training & Certifications\"]",
  );
  await trainingFilterButton.click();

  const taskFilterButton = await page.locator("[aria-label=\"Tasks\"]");
  await expect(taskFilterButton).toBeVisible();
  await taskFilterButton.click();

  const watchingButton = await page.locator("text=Watching");

  await expect(watchingButton).toBeVisible();

  await watchingButton.click();
});
