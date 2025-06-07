import { expect, Page } from "@playwright/test";

export default function login(user: string, password?: string) {
  return async function innerHandler({ page }: { page: Page }) {
    await page.goto("/login");

    await page.fill("#email", user);
    await page.fill("#password", password || "password");
    await expect(page.locator("#email")).toHaveValue(user);
    await expect(page.locator("#password")).toHaveValue(password || "password");

    await page.click("button[id=login-submit]");
    await expect(page).toHaveURL(/o/);

    // eslint-disable-next-line quotes
    const dialogOpen = await page.locator('[role="dialog"]').isVisible();
    if (dialogOpen) {
      // eslint-disable-next-line prettier/prettier
      await page.locator("button:has-text(\"Accept\")").click();
    }
    await page.waitForTimeout(1000);
  };
}
