import { test, expect } from "@playwright/test";

/* eslint-disable quotes, prettier/prettier */
test("i should get the reset password by filling out the reset password page - i should be able to reset my password", async ({ page, baseURL }) => {
  await page.goto(baseURL + "/login");
  await page.getByRole("link", { name: "Reset password?" }).click();
  await page.locator("#email").click();
  await page.locator("#email").fill(process.env.ADMINEMAIL!);
  await page.getByRole("button", { name: "Send Instructions" }).click();

  const message = await page.getByText("We found an account that");
  await message.waitFor({ timeout: 10000000 });
  await expect(message).toBeVisible({ timeout: 10000000 });

  const message2 = await page.getByText("If you can't find the email");
  await message2.waitFor({ timeout: 10000000 });
  await expect(message2).toBeVisible({ timeout: 10000000 });

  const backToLoginLink = await page.getByRole("link", {
    name: "back to Login",
  });
  await message2.waitFor({ timeout: 5000000 });
  await expect(message2).toBeVisible({ timeout: 5000000 });
  await backToLoginLink.click();

  await page.waitForURL(baseURL + "/login");
});
