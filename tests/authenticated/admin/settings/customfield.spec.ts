import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import login from "../../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test.describe("Custom Fields", () => {
    test('i should be able to create custom fields', async ({ page, baseURL }) => {

        await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });

        const urlKeyword = process.env.ADMINSHORTCODE!;
        await page.waitForURL(new RegExp(`.*${urlKeyword}.*`));

        await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!+"/admin");
        const shortCode = process.env.CLIENTSHORTCODE!;
        
        await expect(page).toHaveURL(new RegExp(shortCode), { timeout: 100000 });
        await page.waitForURL(/admin/);
    
        const customFieldButton = page.locator('text=Custom Fields');
        await expect(customFieldButton).toBeVisible({ timeout: 100000 });
        await customFieldButton.click();
    
        await page.waitForURL(/field/);
    
        const createField = page.locator('text=Create Field');
        await expect(createField).toBeVisible({ timeout: 100000 });
        await createField.click();
    
        const combobox = await page.locator('div[data-test="create-custom-field-form"] div[role="combobox"]').nth(0);
        await combobox.waitFor({ state: 'visible' });
        await combobox.click();
    
        await page.getByRole('option', { name: 'dateField' }).click();

        await page.fill('#label', faker.word.noun());

        const checkbox = page.locator('input[name="required"]');
        await checkbox.waitFor({ state: 'visible' });
        await checkbox.click();
        await expect(checkbox).toBeChecked();
    
        const checkboxRead = page.locator('input[name="readonly"]');
        await checkboxRead.waitFor({ state: 'visible' });
        await checkboxRead.click();
        await expect(checkboxRead).toBeChecked();
    
        const checkboxHidden = page.locator('input[name="hidden"]');
        await checkboxHidden.waitFor({ state: 'visible' });
        await checkboxHidden.click();
        await expect(checkboxHidden).toBeChecked();
    
        const checkboxAutoFocus = page.locator('input[name="autoFocus"]');
        await checkboxAutoFocus.waitFor({ state: 'visible' });
        await checkboxAutoFocus.click();
        await expect(checkboxAutoFocus).toBeChecked();
    
        await page.fill('textarea[name="description"]', faker.word.sample());
    
        const comboboxSpan = await page.locator('div[data-test="create-custom-field-form"] div[role="combobox"]').nth(1);
        await comboboxSpan.waitFor({ state: 'visible' });
        await comboboxSpan.click();

        await page.getByRole('option', { name: '3' }).click();


        await page.getByRole('button', { name: 'Create' }).click();

        await expect(page.locator('text=Custom Field Created')).toBeVisible({ timeout: 100000 });
    });

    test('i should be able to edit custom fields', async ({ page, baseURL }) => {
        await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });

        const urlKeyword = process.env.ADMINSHORTCODE!;
        await page.waitForURL(new RegExp(`.*${urlKeyword}.*`));

        await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!+"/admin");
        const shortCode = process.env.CLIENTSHORTCODE!;
        
        await expect(page).toHaveURL(new RegExp(shortCode), { timeout: 100000 });
        await page.waitForURL(/admin/);
        const customFieldButton = page.locator('text=Custom Fields');
        await expect(customFieldButton).toBeVisible({ timeout: 100000 });
        await customFieldButton.click();
    
        await page.waitForURL(/field/);
    
        const typeHeader = await page.locator('div[data-test="custom-field-table"]').getByText('Name');
        await expect(typeHeader).toBeVisible();
        await typeHeader.click();

        for (let i = 0; i < 15; i++) {
            await page.keyboard.press('ArrowRight');
        }
        
        await page.waitForTimeout(500);
    
        const editIcon = await page.locator('[data-testid="EditIcon"]').nth(1);
        await expect(editIcon).toBeVisible({ timeout: 100000 });
        await editIcon.click();
    
        await page.fill('#label', faker.word.noun() + "Edited");
    
        const checkbox = page.locator('input[name="required"]');
        await checkbox.waitFor({ state: 'visible' });
        await checkbox.click();
    
        const checkboxRead = page.locator('input[name="readonly"]');
        await checkboxRead.waitFor({ state: 'visible' });
        await checkboxRead.click();
    
        const comboboxSpan = await page.locator('div[data-test="edit-custom-field-form"] div[role="combobox"]').nth(1);
        await comboboxSpan.waitFor({ state: 'visible' });
        await comboboxSpan.click();
    
        await page.getByRole('option', { name: '2' }).click();
    
        const submitButton = page.locator('button[form="formDialog-edit-field"]');
        await submitButton.waitFor({ state: 'visible' });
        await submitButton.click();
        
        await expect(page.locator('text=Custom Field Updated')).toBeVisible({ timeout: 100000 });
    });
});
