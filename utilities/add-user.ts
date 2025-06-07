import { Page, expect } from "@playwright/test";
export default function addUser(args: {
  email: string;
  firstName: string;
  lastName: string;
  orgId: string;
  tenantId?: string;
  password?: string;
}) {
  return async function innerHandler({ page }: { page: Page }) {
    await page.goto(
      !args.tenantId
        ? `/o/${args.orgId}/people`
        : `/o/${args.orgId}/t/${args.tenantId}/people`,
    );
    await page.getByRole("button", { name: "Add New" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    // eslint-disable-next-line prettier/prettier
    await page.locator("[id=\"metadata\\.firstName\"]").click();
    // eslint-disable-next-line prettier/prettier
    await page.locator("[id=\"metadata\\.firstName\"]").fill(args.firstName);
    // eslint-disable-next-line prettier/prettier
    await page.locator("[id=\"metadata\\.lastName\"]").fill(args.lastName);
    await page.locator("#email").fill(args.email);
    await page.locator("#password").fill(args.password || "password");

    await page.getByRole("button", { name: "Submit" }).click();
    await page.route("**/user/create", (route) =>
      route.fulfill({
        status: 201,
      }),
    );
    await expect(page.getByRole("dialog")).toBeHidden();
  };
}
