import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";

test.use({
  reademail: process.env.READEMAIL,
  readpassword: process.env.READPASSWORD,
});

/* eslint-disable prettier/prettier */
test("i should be able to toggle theme to dark or light mode - i should be able to logout via the logout button or navigating to the /logout page - ", async ({
  page,
  baseURL,
  reademail,
  readpassword,
}) => {
  await login(reademail, readpassword)({ page });
  
  await expect(page.locator("text=Add Client")).not.toBeVisible();
  await expect(page.locator("text=Home")).toBeVisible();
  await expect(page.locator("aside >> text=To Do List")).not.toBeVisible();
  await expect(page.locator("text=Forms Library").nth(0)).toBeVisible();
  await expect(page.locator("text=Document Library")).toBeVisible();
  await expect(page.locator("aside >> text=People")).not.toBeVisible();
  await expect(page.locator("aside >> text=Settings")).not.toBeVisible();

  await expect(page.locator("text=My To Do List")).toBeVisible();
  await expect(page.locator("text=Outstanding Forms")).toBeVisible();
  await expect(page.locator("text=Corrective Actions/Tasks")).toBeVisible();
  await expect(page.locator("text=Training & Certs")).toBeVisible();

  await page
    .locator("#primary-nav")
    .getByRole("button", { name: "Forms Library" })
    .click();
  await page.locator("text=Home").click();
  await expect(
    page.getByRole("heading", { name: "My To Do List" }),
  ).toBeVisible();

  await expect(page.locator("text=Libraries")).toBeVisible();
  await expect(page.locator("text=View History")).toBeVisible();
  await expect(page.locator("text=Forms Library").nth(1)).toBeVisible();
  await expect(page.locator("text=Documents Library")).toBeVisible();
  await expect(page.locator("text=My Trainings & Certs")).toBeVisible();

  await expect(page.locator("text=Active Only")).toBeVisible();
  await expect(page.locator("input[type=\"checkbox\"]")).toBeVisible();

  await page.getByTestId("PersonIcon").click();
  await page.getByText("Dark Theme").click();
  await page.getByTestId("PersonIcon").locator("path").click();
  await page.getByRole("checkbox", { name: "Dark Theme" }).click();
  await expect(page.locator("html")).toHaveClass(/dark-theme/);

  await page.getByTestId("PersonIcon").click();

  const logoutButton = page.locator("text=Logout");
  await expect(logoutButton).toBeVisible();
  await logoutButton.click();

  await expect(page).toHaveURL(/login/);
});
