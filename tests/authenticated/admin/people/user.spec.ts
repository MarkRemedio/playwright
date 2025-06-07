import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import login from "../../../../utilities/login";
import path from "path";

/* eslint-disable quotes, prettier/prettier*/
test.describe("User", () => {
  test("i should be able to delete users that have been removed - i should be able to restore users that have been removed", async ({ page, baseURL }) => {
    await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });

    const indexToUpdate = 0;
    const shortCode = process.env.ADMINSHORTCODE!;
    await expect(page).toHaveURL(new RegExp(shortCode));
    const home = await page.locator("text=Home");
    await expect(home).toBeVisible();
    await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!);
    await page.getByRole("button", { name: "People" }).click();
    const firstPerson = await page.locator('div[data-field="name"][data-colindex="1"]').nth(indexToUpdate);
    await expect(firstPerson).toBeVisible();
    await firstPerson.click();
    const switcher = await page.locator('span[data-test="switchActiveStatus-userinfo"] input');
    await expect(switcher).toBeVisible();
    await switcher.click();
    await expect(page.getByText("User Information Updated.")).toBeVisible({ timeout: 100000 });
    await page
      .locator("h1")
      .getByRole("button")
      .filter({ hasText: /^$/ })
      .click();
    await expect(
      page.getByRole("menuitem", { name: "Remove User" }),
    ).toBeVisible();
    await page.getByRole("menuitem", { name: "Remove User" }).click();
    await expect(
      page.getByRole("heading", { name: "Are you sure you want to" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Yes" }).click();
    await expect(page.getByText("User Removed")).toBeVisible();
    await page.getByRole("button", { name: "Admin" }).click();
    await page.getByRole('listitem').filter({ hasText: 'Users' }).click();

    await page
      .getByRole("columnheader", { name: "Office Phone" })
      .press("ArrowRight");
    await page
      .getByRole("columnheader", { name: "First Name" })
      .press("ArrowRight");
    await page
      .getByRole("columnheader", { name: "Middle Name" })
      .press("ArrowRight");
    await page
      .getByRole("columnheader", { name: "Last Name" })
      .press("ArrowRight");
    await page
      .getByRole("columnheader", { name: "Hired Date" })
      .press("ArrowRight");
    await page.getByRole("columnheader", { name: "City" }).press("ArrowRight");
    await page
      .getByRole("columnheader", { name: "State/Province" })
      .press("ArrowRight");
    await page
      .getByRole("columnheader", { name: "Home Phone" })
      .press("ArrowRight");
    await page
      .getByRole("columnheader", { name: "Removed At" })
      .press("ArrowRight");
    await page
      .getByRole("columnheader", { name: "Created At" })
      .press("ArrowRight");
    await page
      .getByRole("columnheader", { name: "Updated At" })
      .press("ArrowRight");
    const restoreBtn = page.getByRole("menuitem", { name: "Restore" });
    await restoreBtn.click();
    await expect(
      page.getByRole("heading", { name: "Are you sure you want to" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Yes" }).click();

    await expect(page.getByText("User Restored")).toBeVisible();

    await page.getByRole("button", { name: "Admin" }).click();
    await page.getByRole("button", { name: "People" }).click();
    await page.getByRole("button", { name: "Filter" }).click();
    await page.getByText("Clean All").click();
    const firstPersonAfterRemoving = await page.locator('div[data-field="name"][data-colindex="1"]').nth(indexToUpdate);
    await expect(firstPersonAfterRemoving).toBeVisible({ timeout: 150000 });
    await firstPersonAfterRemoving.click();
    const switcherToOn = await page.locator('span[data-test="switchActiveStatus-userinfo"] input');
    await expect(switcherToOn).toBeVisible();
    await switcherToOn.click();
    await expect(page.getByText("User Information Updated.")).toBeVisible({ timeout: 100000 });
  });

  test('i should be able to upload video files', async ({ page, baseURL }) => {
    await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });
    const shortCode = process.env.ADMINSHORTCODE!;
    await expect(page).toHaveURL(new RegExp(shortCode));
    const home = await page.locator("text=Home");
    await expect(home).toBeVisible();
    await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!);

    const adminButton = page.locator('text=Admin');
    await expect(adminButton).toBeVisible();
    await adminButton.click();

    await page.waitForURL(/admin/);

    await page.getByText('Video Uploads').click();
    await page.getByRole('button', { name: 'Upload Video File' }).click();

    await page.waitForURL(/jobs/);

    const videoTitle = faker.word.noun();
    await page.locator('[id="metadata\\.title"]').fill(videoTitle);

    await page.locator('[id="metadata\\.description"]').fill(faker.word.sample());

    const videoPath = path.join(__dirname, '../../../assets/sample video.mp4');

    const fileInput = await page.locator('input[type="file"]');

    await fileInput.setInputFiles(videoPath);

    await page.getByRole('button', { name: 'Create' }).click();

    await page.waitForURL(/video/);

    await page.getByText(videoTitle).isVisible();

    await page.waitForTimeout(3000);
  });
});
