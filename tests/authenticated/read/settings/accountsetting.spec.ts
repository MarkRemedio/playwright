import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";

test.use({
  reademail: process.env.READEMAIL,
  readpassword: process.env.READPASSWORD,
});

/* eslint-disable prettier/prettier */
test("I should be able to access my personal profile", async ({
  page,
  baseURL,
  reademail,
  readpassword,
}) => {
  await login(reademail, readpassword)({ page });

  await page.getByTestId("PersonIcon").click();
  const accountSettings = await page.locator("text=Account Settings");
  await expect(accountSettings).toBeVisible();
  await accountSettings.click();
  
  await page.waitForURL(/user/);

  await expect(page.locator("text=Email").nth(0)).toBeVisible();
  await expect(page.locator("text=Active")).toBeVisible();
  await expect(page.locator("text=Edit").nth(0)).toBeVisible();
  await expect(page.locator("text=Supervisor")).toBeVisible();
  await expect(page.locator("text=Direct Reports")).toBeVisible();
  await expect(page.locator("text=Personal Info")).toBeVisible();
  await expect(page.locator("text=Emergency Contacts")).toBeVisible();
  await expect(page.locator("text=Training & Certifications")).toBeVisible();
  await expect(page.locator("text=Documents")).toBeVisible();
  await expect(page.locator("input[type=\"checkbox\"]")).toBeVisible();

  await expect(page.locator("text=Basic Information")).toBeVisible();
  await expect(page.locator("text=Email").nth(1)).toBeVisible();
  await expect(page.locator("text=First Name").nth(0)).toBeVisible();
  await expect(page.locator("text=Middle Name").nth(0)).toBeVisible();
  await expect(page.locator("text=Last Name").nth(0)).toBeVisible();

  await expect(page.locator("text=Display Name").nth(0)).toBeVisible();
  await expect(page.locator("text=Primary Job Title").nth(0)).toBeVisible();
  await expect(page.locator("text=Employee Number").nth(0)).toBeVisible();

  await expect(page.locator("text=Hired Date").nth(0)).toBeVisible();

  await expect(page.locator("text=Home Address")).toBeVisible();
  await expect(page.locator("text=Line 1").nth(0)).toBeVisible();
  await expect(page.locator("text=Line 2").nth(0)).toBeVisible();
  await expect(page.locator("text=City").nth(0)).toBeVisible();
  await expect(page.locator("text=Country").nth(0)).toBeVisible();
  await expect(page.locator("text=State/Province").nth(0)).toBeVisible();
  await expect(page.locator("text=Zip/Postal Code").nth(0)).toBeVisible();

  await expect(page.locator("text=Contact Information")).toBeVisible();
  await expect(page.locator("text=Email Address").nth(1)).toBeVisible();
  await expect(page.locator("text=Office Phone").nth(0)).toBeVisible();
  await expect(page.locator("text=Mobile Phone").nth(0)).toBeVisible();
  await expect(page.locator("text=Home Phone").nth(0)).toBeVisible();

  await expect(page.locator("text=Assigned Roles")).toBeVisible();
  await expect(page.locator("text=Name").nth(8)).toBeVisible();
  await expect(page.locator("text=Started On")).toBeVisible();
  await expect(page.locator("text=Version")).toBeVisible();

  const EmergencyContacts = page.locator("text=Emergency Contacts");
  await expect(EmergencyContacts).toBeVisible();
  await EmergencyContacts.click();

  await page.waitForURL(/emergency-contacts/);

  await expect(page.locator("text=Add an Emergency Contact")).toBeVisible();

  const DocumentsTab = page.locator("text=Documents");
  await expect(DocumentsTab).toBeVisible();
  await DocumentsTab.click();

  await page.waitForURL(/documents/);

  await expect(page.locator("text=Add Document")).toBeVisible();
  await expect(page.locator("text=Name")).toBeVisible();
  await expect(page.locator("text=Size")).toBeVisible();
  await expect(page.locator("text=Created By")).toBeVisible();
});
