import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";

test.use({
  reademail: process.env.READEMAIL,
  readpassword: process.env.READPASSWORD,
});

/* eslint-disable quotes, prettier/prettier */
test("Verify Document Library", async ({
  page,
  baseURL,
  reademail,
  readpassword,
}) => {
  await login(reademail, readpassword)({ page });

  const trainingcertsLibraryButton = page.locator("text=My Trainings & Certs");
  await expect(trainingcertsLibraryButton).toBeVisible();
  await trainingcertsLibraryButton.click();

  await page.waitForURL(/training-certifications/);
  await expect(page).toHaveURL(/training-certifications/);

  await expect(page.locator("text=Email")).toBeVisible();
  await expect(page.locator("text=Active").nth(0)).toBeVisible();
  await expect(page.locator("text=Supervisor")).toBeVisible();
  await expect(page.locator("text=Direct Reports")).toBeVisible();
  await expect(page.locator("text=Add your First Training")).toBeVisible();
  await expect(page.locator("text=Personal Info")).toBeVisible();
  await expect(page.locator("text=Emergency Contacts")).toBeVisible();
  await expect(page.locator("text=Documents")).toBeVisible();
  await expect(page.locator('input[type="checkbox"]')).toBeVisible();
});
