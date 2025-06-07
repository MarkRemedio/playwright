import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";
import { faker } from "@faker-js/faker";
import path from "path";

/* eslint-disable quotes, prettier/prettier*/
test.describe("Forms", () => {
  test.beforeAll(async ({ browser }) => {
    /*
     * TODO Create a new form with specific system names as currently its a form created manually
     * Section = test-all-element-form
     * Fields = allform-shorttext
     */
  });

  test.beforeEach(async ({ page, baseURL }) => {
    await login(
      process.env.WORKEREMAIL!,
      process.env.WORKERPASSWORD!,
    )({ page });
    await page
      .locator("#primary-nav")
      .getByRole("button", { name: "Forms Library" })
      .click();
    const shortCode = process.env.FORMSHORTCODE!;
    await expect(page).toHaveURL(new RegExp(shortCode));
    await page.waitForTimeout(3000);

    const home = await page.locator("text=Home");
    await expect(home).toBeVisible();

    await page
      .locator("#primary-nav")
      .getByRole("button", { name: "Forms Library" })
      .click();
  });

  test("i should be able to fill in a form", async ({ page, baseURL }) => {
    await page.getByText("All Rounder Form").click();

    await page.waitForTimeout(2000);

    const inputsShortext = await page.locator(
      "input[name=\"test-all-element-form.allform-shorttext-1\"]",
    );
    const countShortText = await inputsShortext.count();

    for (let i = 0; i < countShortText; i++) {
      await page
        .locator("input[name=\"test-all-element-form.allform-shorttext-1\"]")
        .nth(i)
        .fill(faker.word.noun());
    }

    const inputsLongText = await page.locator(
      "input[name=\"test-all-element-form.allform-shorttext-1\"]",
    );
    const countLongText = await inputsLongText.count();

    for (let i = 0; i < countLongText; i++) {
      await page
        .locator("textarea[name=\"test-all-element-form.allform-longtext-1\"]")
        .nth(i)
        .fill(faker.word.noun());
    }

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();

    await page.getByRole("button", { name: "Continue" }).click();

    await expect(
      page.getByRole("button", { name: "Go to Form Library" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Go to Form Library" }).click();
  });

  test("while filling in a form, i can select images or files from those form elements", async ({
    page,
    baseURL,
  }) => {
    await page.getByText("All Rounder Form").click();

    await page.waitForTimeout(2000);

    const inputsShortext = await page.locator(
      "input[name=\"test-all-element-form.allform-shorttext-1\"]",
    );
    const countShortText = await inputsShortext.count();

    for (let i = 0; i < countShortText; i++) {
      await page
        .locator("input[name=\"test-all-element-form.allform-shorttext-1\"]")
        .nth(i)
        .fill(faker.word.noun());
    }

    const inputsLongText = await page.locator(
      "input[name=\"test-all-element-form.allform-shorttext-1\"]",
    );
    const countLongText = await inputsLongText.count();

    for (let i = 0; i < countLongText; i++) {
      await page
        .locator("textarea[name=\"test-all-element-form.allform-longtext-1\"]")
        .nth(i)
        .fill(faker.word.noun());
    }

    const filePath = path.join(__dirname, "../../../assets/sample.jpg");

    const fileInput = await page.locator('input[type="file"]').nth(0);
    await fileInput.setInputFiles(filePath);

    const fileInputOther = await page.locator('input[type="file"]').nth(1);
    await fileInputOther.setInputFiles(filePath);

    await page.waitForTimeout(3000);

    await page.getByRole("button", { name: "Submit" }).nth(0).click();

    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();

    await page.getByRole("button", { name: "Continue" }).click();

    await expect(
      page.getByRole("button", { name: "Go to Form Library" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Go to Form Library" }).click();
  });

  test('while filling in a form, select and view documents', async ({ page, baseURL }) => {
    await page.getByText('All Rounder Form').click();

    await page.waitForTimeout(2000);

    const inputsShortext = await page.locator('input[name="test-all-element-form.allform-shorttext-1"]');
    const countShortText = await inputsShortext.count();

    for(let i=0; i < countShortText; i++){
        await page.locator('input[name="test-all-element-form.allform-shorttext-1"]').nth(i).fill(faker.word.noun())
    }

    const inputsLongText = await page.locator('input[name="test-all-element-form.allform-shorttext-1"]');
    const countLongText = await inputsLongText.count();

    for(let i=0; i < countLongText; i++){
        await page.locator('textarea[name="test-all-element-form.allform-longtext-1"]').nth(i).fill(faker.word.noun());

    }

    await page.getByRole('combobox', { name: 'Document Select' }).click();

    const firstOption = await page.locator('[data-option-index="0"]').first();

    const selectedName = await firstOption.textContent();

    await firstOption.click();

    await page.getByRole('button', { name: ''+selectedName }).click();

    await page.waitForTimeout(3000);

    await page.getByText('Back to form', { exact: true }).click();

    await page.waitForTimeout(3000);
    
    await page.getByRole('button', { name: 'Submit' }).nth(0).click();

    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('button', { name: 'Go to Form Library' })).toBeVisible();

    await page.getByRole('button', { name: 'Go to Form Library' }).click();
  });

  test('while filling in a form, sign a signature field', async ({ page, baseURL }) => {
    await page.getByText('All Rounder Form').click();

    await page.waitForTimeout(2000);

    const inputsShortext = await page.locator('input[name="test-all-element-form.allform-shorttext-1"]');
    const countShortText = await inputsShortext.count();

    for(let i=0; i < countShortText; i++){
        await page.locator('input[name="test-all-element-form.allform-shorttext-1"]').nth(i).fill(faker.word.noun())
    }

    const inputsLongText = await page.locator('input[name="test-all-element-form.allform-shorttext-1"]');
    const countLongText = await inputsLongText.count();

    for(let i=0; i < countLongText; i++){
        await page.locator('textarea[name="test-all-element-form.allform-longtext-1"]').nth(i).fill(faker.word.noun());

    }

    await page.waitForTimeout(3000);

    const canvas = await page.locator('canvas');

    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found or not visible');

    const startX = box.x + 50;
    const startY = box.y + 50;

    // First, click the canvas to activate it
    await page.mouse.click(startX, startY); // This is the key addition

    // Now simulate the drawing (signature)
    await page.mouse.move(startX, startY);
    await page.mouse.down();

    for (let x = 0; x < 100; x += 5) {
      await page.mouse.move(startX + x, startY + (x % 10));
    }

    await page.mouse.up();
  
    await page.waitForTimeout(3000);
    
    await page.getByRole('button', { name: 'Submit' }).nth(0).click();

    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('button', { name: 'Go to Form Library' })).toBeVisible();

    await page.getByRole('button', { name: 'Go to Form Library' }).click();
  });

  test('while filling in a form, fill in time fields', async ({ page, baseURL }) => {
    await page.getByText('All Rounder Form').click();

    await page.waitForTimeout(2000);

    const inputsShortext = await page.locator('input[name="test-all-element-form.allform-shorttext-1"]');
    const countShortText = await inputsShortext.count();

    for(let i=0; i < countShortText; i++){
        await page.locator('input[name="test-all-element-form.allform-shorttext-1"]').nth(i).fill(faker.word.noun())
    }

    const inputsLongText = await page.locator('input[name="test-all-element-form.allform-shorttext-1"]');
    const countLongText = await inputsLongText.count();

    for(let i=0; i < countLongText; i++){
        await page.locator('textarea[name="test-all-element-form.allform-longtext-1"]').nth(i).fill(faker.word.noun());

    }

    await page.getByRole('combobox', { name: 'Dropdown' }).click();

    const firstOption = await page.locator('.MuiAutocomplete-option').first();
    await firstOption.click();

    await page.getByRole('textbox', { name: 'Date Form' }).click();
    await page.getByRole('textbox', { name: 'Date Form' }).fill('12/20/2025');
    await page.getByRole('textbox', { name: 'Time Form' }).click();
    await page.getByRole('textbox', { name: 'Time Form' }).fill('12:12 AM');

    await page.waitForTimeout(3000);
    
    await page.getByRole('button', { name: 'Submit' }).nth(0).click();

    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('button', { name: 'Go to Form Library' })).toBeVisible();

    await page.getByRole('button', { name: 'Go to Form Library' }).click();
  });

  test('while filling in a form, submitting will validate the form fields', async ({ page, baseURL }) => {
    await page.getByText('All Rounder Form').click();

    await page.waitForTimeout(3000);
    
    await page.getByRole('button', { name: 'Submit' }).nth(0).click();

    await page.waitForTimeout(2000);

    const errorText = await page.locator("text=Looks like theres an error in your form. Have a look to see if theres some missing or invalid data.");
    await expect(errorText).toBeVisible();
  });

  test('while filling in a form, fill in date fields - while filling in a form, saving will not trigger form validations', async ({ page, baseURL }) => {
    await page.getByText('All Rounder Form').click();
  
    const chooseDateButton = await page.getByRole('button', { name: 'Choose date' });
    chooseDateButton.click();
  
    const dateFormTextbox = await page.getByRole('textbox', { name: 'Date Form' });
    await dateFormTextbox.click();
    await dateFormTextbox.dblclick();
    await dateFormTextbox.fill("04/08/2025");
  
  
    await expect(dateFormTextbox).toBeVisible();
    await expect(dateFormTextbox).toHaveValue("04/08/2025");

    const shortTextInput = await page.locator('input[name$=".allform-shorttext-1"]');
  await expect(shortTextInput).toBeVisible();
  await shortTextInput.click();
  await shortTextInput.fill('test save');

  const saveButton = await page.getByRole('button', { name: 'Save' }).first();
  await expect(saveButton).toBeVisible();
  await saveButton.click();

  await expect(page.getByRole('button', { name: 'Go Home' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Go to Form Library' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'View Form' })).toBeVisible();
  await page.getByRole('button', { name: 'View Form' }).click();
  await expect(shortTextInput).toBeVisible();
  });

  test('while filling in a form, i can add corrective action instances - while filling in a form, i can add sub form instances', async ({ page, baseURL }) => {
    const allRounderForm = await page.getByText('All Rounder FormView');
    await allRounderForm.click();
  
    const shortTextInput = await page.locator('input[name$=".allform-shorttext-1"]');
    await shortTextInput.click();
    await shortTextInput.fill('add corrective action test');
  
    const longText = await page.locator('textarea[name$=".allform-longtext-1"]');
    await longText.click();
    await longText.fill("add corrective action test");
  
    const addCorrectiveAction = await page.getByRole('heading', { name: 'Add Corrective Action Task' });
    await expect(addCorrectiveAction).toBeVisible();
    await addCorrectiveAction.click();
  
    const correctiveActionDescription = await page.locator('input[name$=".__form.meta.title"]');
    await correctiveActionDescription.click();
    await correctiveActionDescription.fill('test add corrective action');
  
    const correctiveActionDueDate = await page.getByRole('textbox', { name: 'Due Date' });
    await correctiveActionDueDate.click();
    await correctiveActionDueDate.fill('03/03/2026');
  
    await page.locator('.flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
    const assignToListBox = await page.getByRole('listbox', { name: 'Assign To' }).getByRole('paragraph');
    await assignToListBox.click();


    const addTestFormButton = await page.getByRole('heading', { name: 'Add Test Forms' });
    await addTestFormButton.click();

    const field1 = await page.getByRole('combobox', { name: 'Field 1' });
    await field1.click();
    const field1Option = await page.getByRole('option', { name: 'ssssaaa' });
    await field1Option.click();

    const field5 = await page.locator('textarea[name$=".f-1io2rrr36-8mjb"]');
    await field5.fill('add subform test');

    const field6 = await page.locator('input[name$=".f-1io2rrre4-581l"]');
    await field6.fill('add subform test');

    const saveButton = await page.getByRole('button', { name: 'Save' }).first();
    await saveButton.click();
  
    const viewForm = await page.getByRole('button', { name: 'View Form' });
    await expect(viewForm).toBeVisible();
    await viewForm.click();
  
    const formCorrectiveActionDescription = await page.locator('input[name$=".__form.meta.title"]');
    await formCorrectiveActionDescription.click();
    await expect(formCorrectiveActionDescription).toBeVisible();
    const formCorrectiveActionDueDate = await page.getByRole('textbox', { name: 'Due Date' });
    await expect(formCorrectiveActionDueDate).toBeVisible();
  });

  
});
