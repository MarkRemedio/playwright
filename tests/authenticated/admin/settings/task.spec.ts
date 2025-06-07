import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test.describe("Tasks", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });
    const shortCode = process.env.ADMINSHORTCODE!;
    await expect(page).toHaveURL(new RegExp(shortCode));
    const home = await page.locator("text=Home");
    await expect(home).toBeVisible();
  
    await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!);
  
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByText('Tasks Types').click();
  });

  test('i should be able to create task config', async ({ page, baseURL }) => {
    await page.getByRole('button', { name: 'Create Task Configuration' }).click();
  
    const taskTitle = faker.word.words(3);
    await page.locator('#title').fill(taskTitle);
  
    const taskName = taskTitle.toLowerCase().replace(/\s+/g, "-");
    await page.locator('#name').fill(taskName);
  
    await page.locator('#description').fill(faker.word.words(10));
    await page.getByRole('button', { name: 'Create' }).click();
    await page.locator('div').filter({ hasText: /^Add Workflow Step$/ }).click();
  
    const firstSection = await page.locator('div[id^="sections."]')
    await firstSection.isVisible();
    await firstSection.click();
  
    const sectionTitle = await page.locator('input[name^="config.sections."][name$=".label"]').first();
    await sectionTitle.click();
    await sectionTitle.fill(faker.word.noun());
  
    const checkBoxElement = await page.getByRole('heading', { name: 'Check Box' });
    await checkBoxElement.isVisible();
    await checkBoxElement.click();
    await checkBoxElement.click();
  
    const firstDiv = await page.locator('div[id^="sections."][id*=".fields."]').first();
    await firstDiv.isVisible();
    await firstDiv.click();
  
    const firstInput = await page.locator('input[name^="config.sections."][name$=".label"]').first();
    await firstInput.fill(faker.word.verb());
  
    const secondDiv = await page.locator('div[id^="sections."][id*=".fields."]').nth(1);
    await secondDiv.isVisible();
    await secondDiv.click();
    
    const secondInput = await page.locator('input[name^="config.sections."][name$=".label"]').first();
    await secondInput.fill(faker.word.verb());
  
    await page.getByRole('button', { name: 'Add Form Element' }).click();
  
    const imageElement = await page.getByRole('heading', { name: 'Image' })
    await imageElement.isVisible();
    await imageElement.click();
  
    const thirdDivElement = await page.locator('div[id^="sections."][id*=".fields."]').nth(2);
    await thirdDivElement.isVisible();
    await thirdDivElement.click();
  
    const thirdInput = await page.locator('input[name^="config.sections."][name$=".label"]').first();
    await thirdInput.fill(faker.word.verb());
  
  
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Publish' }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'Task Published' })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: taskName })).toBeVisible();
  });

  test('i should be able to delete an unused task', async ({ page }) => {
    await page.getByRole('columnheader', { name: 'Name' }).locator('div').nth(1).click();
    await page.getByRole('columnheader', { name: 'Name' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Title' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Version #' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Build #' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Save Version' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Types' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Description' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Id' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Build At' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Created At' }).press('ArrowRight');
  
    const editIcon = await page.locator('[data-testid="DeleteIcon"]').first();
    await editIcon.isVisible();
    await editIcon.click();
  
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.getByText('Task Configuration Removed')).toBeVisible();
  });

  test('i should be able to update task configs', async ({ page, baseURL }) => {
    await page.getByRole('columnheader', { name: 'Name' }).locator('div').nth(1).click();
    await page.getByRole('columnheader', { name: 'Name' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Title' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Version #' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Build #' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Save Version' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Types' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Description' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Id' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Build At' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Created At' }).press('ArrowRight');
  
    const id = await page.locator('div[data-field="id"]').nth(1).textContent();
    await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!+"/admin/object-config/tasks/"+id+"/edit");
    
    await page.getByRole('heading', { name: 'Task Configuration' }).waitFor({ state: 'visible' });
  
    const title = faker.word.noun();
    await page.locator('input[id="config\\.title"]').fill(title);
  
    await page.locator('div').filter({ hasText: /^Notification Config$/ }).click();
    const options =  await page.locator('li[role="option"]');
    const optionCount = await options.count();
    const choiceIndex = Math.floor(Math.random() * (optionCount-1));
    await options.nth(choiceIndex).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await page.getByTestId('ArrowBackIcon').locator('path').click();
  });

  test('i should be able to share a task', async ({ page, baseURL }) => {
    await page.getByRole('columnheader', { name: 'Name' }).locator('div').nth(1).click();
    await page.getByRole('columnheader', { name: 'Name' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Title' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Version #' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Build #' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Save Version' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Types' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Description' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Id' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Build At' }).press('ArrowRight');
    await page.getByRole('columnheader', { name: 'Created At' }).press('ArrowRight');

    await page.locator('[data-testid="ShareIcon"]').first().click();

    const futureDate = faker.date.future();
    const formattedDate = futureDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    await page.locator('input[name="formDef.expiresAt"]').fill(formattedDate);

    await page.locator('[data-test-id="share-assignee"]').click();
    const options =  await page.locator('li[role="option"]');
    const optionCount = await options.count();
    const choiceIndex = Math.floor(Math.random() * (optionCount-1));
    await options.nth(choiceIndex).click();
    await page.locator('[data-test-id="share-assignee"]').click();
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
  });
})
