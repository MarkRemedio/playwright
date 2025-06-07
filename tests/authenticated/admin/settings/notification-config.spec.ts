import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test.describe("Notification Config", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });

    const urlKeyword = process.env.ADMINSHORTCODE!;
    await page.waitForURL(new RegExp(`.*${urlKeyword}.*`));

    await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!+"/admin");
    const shortCode = process.env.CLIENTSHORTCODE!;

    await expect(page).toHaveURL(new RegExp(shortCode), { timeout: 100000 });
    await page.waitForURL(/admin/);
    const closeBtn = await page.getByText('Close');
    if(await closeBtn.isVisible()) {
      await closeBtn.click();
    }
    await page.getByRole('heading', { name: 'Settings' }).isVisible({ timeout: 100000 });
  });

  test('i should be able to add, edit, delete a notification config - i can add notification by active users', async ({ page, baseURL }) => {
    await page.getByText('Notification Config').click();
    await page.getByRole('button', { name: 'Create Notification Config' }).click();

    const notificationName = faker.word.noun();
    await page.locator('#name').fill(notificationName);
    await page.locator('input[name="toggleVisibility\\.onCreate\\.show"]').check();
    const firstBox = await page.locator('[data-test="notificationconfig-receiver"]').first();
    await firstBox.click();
    await page.getByRole('option', { name: 'Active Users' }).click();
    
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByText('Notification Config Created')).toBeVisible({ timeout: 100000 });

    await page.reload();

    await expect(page.getByRole('rowgroup')).toContainText(notificationName, { timeout: 100000 });
    const rowsBeforeRemoval = await page.locator('div[data-test="notification-table"] [role="row"]').all();

    expect(rowsBeforeRemoval.length).toBeGreaterThan(0);

    const firstRow = await page.locator('div[data-test="notification-table"] [role="row"]').nth(1);
    await firstRow.click();

    const newnotificationName = faker.word.words(2);
    await page.locator('#name').fill(newnotificationName);
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('Notification Config Updated')).toBeVisible();
    await page.reload();
    await expect(page.getByRole('rowgroup')).toContainText(newnotificationName, { timeout: 100000 });

    const newNotificationName = await page.locator('div[role="row"]:has-text("' + notificationName + '")');
    await newNotificationName.isVisible();
    await page.pause();
    await newNotificationName.click();
    await page.getByRole('button', { name: 'Remove' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.reload();
    const rowsAfterRemoval = await page.locator('.MuiDataGrid-virtualScrollerRenderZone [role="row"]').all();

    expect(rowsAfterRemoval.length).toBeLessThan(rowsBeforeRemoval.length);
  });

  test('i can add notification by role', async ({ page, baseURL }) => {
    await page.getByText('Notification Config').click();
    await page.getByRole('button', { name: 'Create Notification Config' }).click();

    const name = faker.word.noun() + "-per-role";
    await page.locator('#name').fill(name);
    await page.locator('div').filter({ hasText: 'On Initial Creation of Object' }).nth(3).click();
    await page.locator('input[name="toggleVisibility\\.onCreate\\.show"]').check();
    const firstBox = await page.locator('[data-test="notificationconfig-roles"]').first();
    await firstBox.click();

    const firstOption = await page.locator('[data-option-index="0"]').first();
    await firstOption.click();
    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByText('Notification Config Created')).toBeVisible({ timeout: 100000 });
    await page.reload();
    await expect(page.getByRole('rowgroup')).toContainText(name, { timeout: 100000 });
    const newNotificationName = await page.locator('div[role="row"]:has-text("' + name + '")');
    await newNotificationName.isVisible();
    await page.pause();
    await newNotificationName.click();
  });

  test('i can add notification by specific user', async ({ page, baseURL }) => {
    await page.getByText('Notification Config').click();
    await page.getByRole('button', { name: 'Create Notification Config' }).click();

    const name = faker.word.noun() + "-assign-user";
    await page.locator('#name').fill(name);
    await page.locator('div').filter({ hasText: 'On Initial Creation of Object' }).nth(3).click();
    await page.locator('input[name="toggleVisibility\\.onCreate\\.show"]').check();

    const firstBox = await page.locator('[data-test="notificationconfig-additionaluser"]').first();
    await firstBox.click();

    const firstOption = await page.locator('[data-option-index="0"]').first();
    await firstOption.click();
    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByText('Notification Config Created')).toBeVisible({ timeout: 100000 });
    await page.reload();
    await expect(page.getByRole('rowgroup')).toContainText(name, { timeout: 100000 });
    const newNotificationName = await page.locator('div[role="row"]:has-text("' + name + '")');
    await newNotificationName.isVisible();
    await page.pause();
    await newNotificationName.click();
  });
});
