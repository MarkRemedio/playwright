import { test, expect } from "@playwright/test";

/* eslint-disable quotes, prettier/prettier */
test.describe("Login Page", () => {
  test.use({ email: process.env.ADMINEMAIL, password: process.env.ADMINPASSWORD });

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL + "/login");
  });

  test("has the correct text details", async ({ page }) => {
    await expect(page).toHaveTitle(/Wombat Safety Software/);

    const wholeBody = page.locator("body");
    await expect(wholeBody).toContainText("Reset password?");
    await expect(wholeBody).toContainText("get help");
    await expect(wholeBody).toContainText("Sign In");

    const loginButton = page.getByRole("button", { name: "Sign In" });
    await expect(loginButton).toBeVisible();
    const googleButton = page.locator("button:has-text('Google')");
    await expect(googleButton).toBeVisible();
    const microsoftButton = page.locator("button:has-text('Microsoft')");
    await expect(microsoftButton).toBeVisible();

    const emailField = page.locator("input[type=\"text\"]");
    await expect(emailField).toBeVisible();
    await expect(emailField).toHaveAttribute("id", "email");

    // Check if the password input field is visible
    const passwordField = page.locator("input[type=\"password\"]");
    await expect(passwordField).toBeVisible();
    await expect(passwordField).toHaveAttribute("id", "password");
  });

  test("i should be able to login with email & password", async ({ page, email, password, baseURL }) => {
    await page.fill("#email", email);
    await page.fill("#password", password);
    await expect(page.locator("#email")).toHaveValue(email);
    await expect(page.locator("#password")).toHaveValue(password);

    await page.click("button[id=login-submit]");

    await page.waitForURL(baseURL + "/o/MARKTEST");
    await expect(page).toHaveURL(/MARKTEST/);
    const homeText = await page.locator("text=Home");
    await expect(homeText).toBeVisible();
  });
});
