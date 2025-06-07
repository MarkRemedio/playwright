import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import login from "../../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test.describe("Roles", () => {
    test("i should be able to add roles", async ({ page, baseURL }) => {
        await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });

        const shortCode = process.env.ADMINSHORTCODE!;
        await expect(page).toHaveURL(new RegExp(shortCode));

        const home = await page.locator("text=Home");
        await expect(home).toBeVisible({ timeout: 100000 });

        await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!);
        const todoTxt = await page.locator("text=My To Do List");     
        await expect(todoTxt).toBeVisible();

        const adminButton = page.locator('text=Admin');
        await expect(adminButton).toBeVisible({ timeout: 100000 });
        await adminButton.click();

        await page.waitForURL(/admin/);

        await expect(page.locator('text=Roles')).toBeVisible({ timeout: 100000 });

        const rolesbutton = page.locator('text=Roles');
        await expect(rolesbutton).toBeVisible({ timeout: 100000 });
        await rolesbutton.click();

        await page.waitForURL(/roles/);

        const addRoleButton = page.locator('text=Add a Role');
        await expect(addRoleButton).toBeVisible({ timeout: 100000 });
        await addRoleButton.click();

        await expect(page.locator('text=Create Role')).toBeVisible({ timeout: 100000 });

        await page.fill('#name', faker.word.noun());
        await page.fill('textarea[name="metadata.description"]', faker.word.sample());

        await page.getByRole('combobox', { name: 'Recommended Training' }).click();

        await page.waitForSelector('[role="option"]');

        const recommendedTrainingOption = page.locator('[role="option"]').first();
    await recommendedTrainingOption.click();

        await page.getByRole('combobox', { name: 'Mandatory Training' }).click();

        await page.waitForSelector('[role="option"]');

        const mandatoryTrainingOption = page.locator('[role="option"]').first();
    await mandatoryTrainingOption.click();

        const createButton = await page.getByRole('button', { name: 'Create' })
        await expect(createButton).toBeVisible({ timeout: 100000 });
        await createButton.click();

        await page.waitForTimeout(2000);

        await expect(page.locator('text=Role Created')).toBeVisible({ timeout: 100000 });

        await page.waitForTimeout(3000);
    });

    test('i should be able to edit roles', async ({ page, baseURL }) => {

        await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });

        const shortCode = process.env.ADMINSHORTCODE!;
        await expect(page).toHaveURL(new RegExp(shortCode));

        const home = await page.locator("text=Home");
        await expect(home).toBeVisible({ timeout: 100000 });

        await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!);
  const todoTxt = await page.locator("text=My To Do List");     
  await expect(todoTxt).toBeVisible();

        const adminButton = page.locator('text=Admin');
        await expect(adminButton).toBeVisible({ timeout: 100000 });
        await adminButton.click();

        await page.waitForURL(/admin/);

        await expect(page.locator('text=Roles')).toBeVisible({ timeout: 100000 });

        const rolesbutton = page.locator('text=Roles');
        await expect(rolesbutton).toBeVisible({ timeout: 100000 });
        await rolesbutton.click();

        await page.waitForURL(/roles/);
    
        const editIcon = page.locator('[data-testid="EditIcon"]').nth(0);
        await editIcon.waitFor({ state: 'visible' });
        await editIcon.click();
    
        await expect(page.locator('text=Update Role')).toBeVisible({ timeout: 100000 });
    
        await page.fill('#name', faker.word.noun() + "edited");
        await page.fill('textarea[name="metadata.description"]', faker.word.sample() + "edited");
    
        const firstCancelIcon = page.locator('[data-testid="CancelIcon"]').nth(0);
        await firstCancelIcon.waitFor({ state: 'visible' });
        await firstCancelIcon.click();
    
        const secondCancelIcon = page.locator('[data-testid="CancelIcon"]').nth(0);
        await secondCancelIcon.waitFor({ state: 'visible' });
        await secondCancelIcon.click();

        await page.getByRole('combobox', { name: 'Recommended Training' }).click();

        await page.waitForSelector('[role="option"]');

        const recommendedTrainingOption = page.locator('[role="option"]').first();
    await recommendedTrainingOption.click();

        await page.getByRole('combobox', { name: 'Mandatory Training' }).click();

        await page.waitForSelector('[role="option"]');

        const mandatoryTrainingOption = page.locator('[role="option"]').first();
    await mandatoryTrainingOption.click();
       
        const submitButton = page.locator('button[form="formDialog-edit-role"]');
        await submitButton.waitFor({ state: 'visible' });
        await submitButton.click();
    
        await expect(page.locator('text=Role Updated')).toBeVisible({ timeout: 100000 });
    
        await page.waitForTimeout(3000);
    });
});
