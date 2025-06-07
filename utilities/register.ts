import { Page, expect } from "@playwright/test";

export default function register(args: {
  displayName?: string;
  email: string;
  password: string;
  orgName: string;
  orgId: string;
}) {
  return async function innerHandler({ page }: { page: Page }) {
    await page.goto("/register");
    await page
      // eslint-disable-next-line prettier/prettier
      .locator("input[name=\"user\\.0\\.displayName\"]")
      .fill(args.displayName || args.email);
    // eslint-disable-next-line prettier/prettier
    await page.locator("input[name=\"user\\.0\\.email\"]").fill(args.email);
    // eslint-disable-next-line prettier/prettier
    await page.locator("input[name=\"user\\.0\\.password\"]").fill(args.password);
    // eslint-disable-next-line prettier/prettier
    await page.locator("[id=\"user\\.0\\.confirmPassword\"]").fill(args.password);
    // eslint-disable-next-line prettier/prettier
    await page.locator("[id=\"organization\\.0\\.name\"]").fill(args.orgName);
    // eslint-disable-next-line prettier/prettier
    await page.locator("[id=\"organization\\.0\\.id\"]").fill(args.orgId);
    // eslint-disable-next-line prettier/prettier
    await page.locator("button:has-text(\"Register\")").click();
    await page.waitForURL(`/o/${args.orgId}`);
    // eslint-disable-next-line prettier/prettier
    await expect(page.locator("[role=\"dialog\"]")).toBeVisible();
    // eslint-disable-next-line prettier/prettier
    await page.locator("button:has-text(\"Accept\")").click();
    // eslint-disable-next-line prettier/prettier
    await expect(page.locator("[role=\"dialog\"]")).toBeHidden();
  };
}
