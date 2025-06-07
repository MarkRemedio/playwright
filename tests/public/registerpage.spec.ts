import { test, expect } from "@playwright/test";
import { orgAdmin } from "tests/constants";

/* eslint-disable quotes, prettier/prettier */
// TO DO: Remove Skip Once global.teardown is working because these will only work once its registered
test.describe.skip("Register Page", () => {
  test.use({ email: process.env.ADMINEMAIL, password: process.env.ADMINPASSWORD });

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL + "/register");
  });

  test("has the correct text", async ({ page }) => {
    await expect(page).toHaveTitle(/Wombat Safety Software/);

    const wholeBody = page.locator("body");
    await expect(wholeBody).toContainText("Register");
    await expect(wholeBody).toContainText("back to Login");
    await expect(wholeBody).toContainText("User Information");
    await expect(wholeBody).toContainText("Organization");
    const googleButton = page.locator("button:has-text(\"Register\")");
    await expect(googleButton).toBeVisible();
    const displayName = page.locator("input[id=\"user.displayName\"]");
    await expect(displayName).toBeVisible();

    const emailField = page.locator("input[id=\"user.email\"]");
    await expect(emailField).toBeVisible();

    const orgnameField = page.locator("input[id=\"organization.name\"]");
    await expect(orgnameField).toBeVisible();

    const shortCodeField = page.locator("input[id=\"organization.id\"]");
    await expect(shortCodeField).toBeVisible();

    const passwordField = page.locator("input[id=\"user.password\"]");
    await expect(passwordField).toBeVisible();

    const confirmPasswordField = page.locator(
      "input[id=\"user.confirmPassword\"]",
    );
    await expect(confirmPasswordField).toBeVisible();
  });

  test("Register", async ({ page }) => {
    const fakeAdmin = orgAdmin;
    const displayName = page.locator("input[id=\"user.displayName\"]");
    await displayName.fill(fakeAdmin.displayName);

    const emailField = page.locator("input[id=\"user.email\"]");
    await emailField.fill(fakeAdmin.email);

    const orgnameField = page.locator("input[id=\"organization.name\"]");
    await orgnameField.fill(fakeAdmin.orgName);

    const shortCodeField = page.locator("input[id=\"organization.id\"]");
    await shortCodeField.fill(fakeAdmin.orgId);

    const passwordField = page.locator("input[id=\"user.password\"]");
    await passwordField.fill(fakeAdmin.password);

    const confirmPasswordField = page.locator(
      "input[id=\"user.confirmPassword\"]",
    );
    await confirmPasswordField.fill(fakeAdmin.password);

    const button = page.locator("#login-submit");
    await button.waitFor();
    await expect(button).toBeVisible();
    await button.click();

    const expectedUrl = `/o/${fakeAdmin.orgId}`;
    await expect(page).toHaveURL(new RegExp(expectedUrl), { timeout: 5000000 });
    await expect(page.locator("text=Home")).toBeVisible();
  });
});
