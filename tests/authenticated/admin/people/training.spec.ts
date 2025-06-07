import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import login from "../../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test.describe("Training", () => {
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

    test('i should be able to create a training type', async ({ page, baseURL }) => {
        const trainingTypeButton = page.locator('text=Training Types');
        await expect(trainingTypeButton).toBeVisible({ timeout: 100000 });
        await trainingTypeButton.click();
    
        await page.waitForURL(/training/);
      
        const createTraining = page.locator('text=Add a Training Type');
        await expect(createTraining).toBeVisible({ timeout: 100000 });
        await createTraining.click();

        await page.fill('#name', faker.word.noun());   
        
        await page.getByRole('combobox', { name: 'Training Type' }).click();

        await page.waitForSelector('[role="option"]');

        const recommendedTrainingOption = page.locator('[role="option"]').first();
    await recommendedTrainingOption.click();
     
        await page.getByRole('combobox', { name: 'Training Categories' }).fill(faker.word.sample());
    
        const inputFieldCost = page.locator('#metadata\\.estimatedCost'); 
        await expect(inputFieldCost).toBeVisible({ timeout: 100000 });
        await inputFieldCost.fill('1000');
        await expect(inputFieldCost).toHaveValue('1000');
    
        const inputFieldHours = page.locator('#metadata\\.estimatedHours'); 
        await expect(inputFieldHours).toBeVisible({ timeout: 100000 });
        await inputFieldHours.fill('32');
        await expect(inputFieldHours).toHaveValue('32');
    
        await page.fill('textarea[name="metadata.description"]', faker.word.sample());
    
        await page.getByRole('combobox', { name: 'Training Form' }).click();
        
        await page.waitForSelector('[role="option"]');

        const trainingFormOption = page.locator('[role="option"]').first();
    await trainingFormOption.click();

        await page.getByRole('combobox', { name: 'Notification Config' }).click();
        await page.waitForSelector('[role="option"]');

        const notificationConfigOption = page.locator('[role="option"]').first();
    await notificationConfigOption.click();
    
        await page.getByRole('button', { name: 'Create' }).click();
        
        await page.waitForTimeout(1000);
    
        await expect(page.locator('text=Training Created')).toBeVisible({ timeout: 100000 });
    
        await page.waitForTimeout(3000);
    });

    test('i should be able to edit a training config - publish a training config', async ({ page, baseURL }) => {
        const trainingTypeButton = page.locator('text=Training Types');
        await expect(trainingTypeButton).toBeVisible();
        await trainingTypeButton.click();
    
        await page.waitForURL(/training/);

        const typeHeader = await page.locator('[data-test="training-table"]').getByText('Types');
        await expect(typeHeader).toBeVisible();
        await typeHeader.click();
    
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
      
        const editIcon = page.locator('[data-testid="EditIcon"]').nth(0);
        await editIcon.waitFor({ state: 'visible' });
        await editIcon.click();

        const name = faker.word.noun();
        await page.fill('#name', name);

        await page.getByRole('button', { name: 'Update' }).click();
        
        await page.waitForTimeout(1000);
    
        await expect(page.locator('text=Training Updated')).toBeVisible();
    
        await page.waitForTimeout(3000);

        await page.getByRole('button', { name: 'No' }).click();

        const publishButton = await page.getByRole('row', { name: `${name}` }).getByLabel('Build');
        await expect(publishButton).toBeVisible();
        await publishButton.click();
    });

    test('i should not be able to delete a training that is used within a role', async ({ page, baseURL }) => {
        await expect(page.locator('text=Roles')).toBeVisible();

        const rolesbutton = page.locator('text=Roles');
        await expect(rolesbutton).toBeVisible();
        await rolesbutton.click();

        await page.waitForURL(/roles/);
    
        const editIcon = page.locator('[data-testid="EditIcon"]').nth(0);
        await editIcon.waitFor({ state: 'visible' });
        await editIcon.click();
    
        await expect(page.locator('text=Update Role')).toBeVisible();

        const spanElement = await page.locator('[data-tag-index="0"] span').first();

        const spanText = await spanElement.textContent();

        await page.getByRole('button', { name: 'Cancel' }).click();

        const trainingTypeButton = page.locator('text=Training Types');
        await expect(trainingTypeButton).toBeVisible();
        await trainingTypeButton.click();
    
        await page.waitForURL(/training/);

        await page.waitForTimeout(2000);

        const typeHeader = await page.locator('[data-test="training-table"]').getByText('Types');
        await expect(typeHeader).toBeVisible();
        await typeHeader.click();
    
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');


        await page.getByRole('row', { name: `${spanText}` }).getByLabel('Remove').click();

        await page.getByRole('button', { name: 'Yes' }).click();

        const ErrorText = await page.locator("text=Schema can only be remove if its unused.");
        await expect(ErrorText).toBeVisible();
     
        await page.waitForTimeout(2000);
    });

    test('i should be able to delete a training config that is not used', async ({ page, baseURL }) => {
        const trainingTypeButton = page.locator('text=Training Types');
        await expect(trainingTypeButton).toBeVisible();
        await trainingTypeButton.click();
    
        await page.waitForURL(/training/);
      
        const createTraining = page.locator('text=Add a Training Type');
        await expect(createTraining).toBeVisible();
        await createTraining.click();

        const nameText = faker.word.noun();

        await page.fill('#name', nameText);   
        
        await page.getByRole('combobox', { name: 'Training Type' }).click();

        await page.waitForSelector('[role="option"]');

        const trainingTypeOption = page.locator('[role="option"]').first();
    await trainingTypeOption.click();
     
        await page.getByRole('combobox', { name: 'Training Categories' }).fill(faker.word.sample());
    
        const inputFieldCost = page.locator('#metadata\\.estimatedCost'); 
        await expect(inputFieldCost).toBeVisible();
        await inputFieldCost.fill('1000');
        await expect(inputFieldCost).toHaveValue('1000');
    
        const inputFieldHours = page.locator('#metadata\\.estimatedHours'); 
        await expect(inputFieldHours).toBeVisible();
        await inputFieldHours.fill('32');
        await expect(inputFieldHours).toHaveValue('32');
    
        await page.fill('textarea[name="metadata.description"]', faker.word.sample());
    
        await page.getByRole('combobox', { name: 'Training Form' }).click();
        
        await page.waitForSelector('[role="option"]');

        const trainingFormOption = page.locator('[role="option"]').first();
    await trainingFormOption.click();

        await page.getByRole('combobox', { name: 'Notification Config' }).click();
        await page.waitForSelector('[role="option"]');

        const notificationConfigOption = page.locator('[role="option"]').first();
    await notificationConfigOption.click();
    
        await page.getByRole('button', { name: 'Create' }).click();
        
        await page.waitForTimeout(1000);
    
        await expect(page.locator('text=Training Created')).toBeVisible();

        await page.waitForTimeout(1000);

        const typeHeader = await page.locator('[data-test="training-table"]').getByText('Types');
        await expect(typeHeader).toBeVisible();
        await typeHeader.click();
    
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');

        await page.getByRole('row', { name: `${nameText}` }).getByLabel('Remove').click();

        await page.getByRole('button', { name: 'Yes' }).click();

        await expect(page.locator('text=Training Removed')).toBeVisible();
    
        await page.waitForTimeout(3000);
    });
});
