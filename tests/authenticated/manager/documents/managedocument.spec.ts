import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";
import { faker } from "@faker-js/faker";
import path from "path";

/* eslint-disable quotes, prettier/prettier*/
test.describe("Manager Document", () => {
    
    test.beforeEach(async ({ page, baseURL }) => {
        await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });
          
        const shortCode = process.env.ADMINSHORTCODE!;
        await expect(page).toHaveURL(new RegExp(shortCode));
        const home = await page.locator("text=Home");
        await expect(home).toBeVisible();
        
        await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!);
        const todoTxt = await page.locator("text=My To Do List");
        await expect(todoTxt).toBeVisible();
        
        await page.locator('#primary-nav').getByRole("button", { name: 'Document Library' }).click();
    });

    test('MANAGE_DOCUMENT, i should be able to add a new document thats a pdf', async ({ page, baseURL }) => {
        const firstFolderButton = await page.getByRole('button', { name: 'Add Your First Folder' });
        if (await firstFolderButton.isVisible()) {
            await firstFolderButton.click();
            await page.getByText('Add Document').click();
            await page.locator('#title').fill(faker.word.noun());
        } else {
            await page.getByRole('button', { name: 'Add New' }).click();
            await page.getByRole('menuitem', { name: 'Document' }).click();
            await page.locator('#title').fill(faker.word.noun());
        }

        await page.getByRole('button', { name: 'Create' }).click();

        await page.waitForTimeout(2000);

        const filePath = path.join(__dirname, '../../../assets/samplepdf.pdf');

        const fileInput = await page.locator('input[type="file"]').nth(0);
        await fileInput.setInputFiles(filePath);

        await page.waitForTimeout(3000);

        await page.getByRole('button', { name: 'Upload' }).click();

        await expect(page).toHaveURL(/edit/);

    });

    test('MANAGE_DOCUMENT, i should be able to add a folder', async ({ page, baseURL }) => {
        const firstFolderButton = await page.getByRole('button', { name: 'Add Your First Folder' });
        if (await firstFolderButton.isVisible()) {
            await firstFolderButton.click();
            await page.getByText('Add Folder').click();
            await page.locator('#title').fill(faker.word.noun());
        } else {
            await page.getByRole('button', { name: 'Add New' }).click();
            await page.getByRole('menuitem', { name: 'Folder' }).click();
            await page.locator('#title').fill(faker.word.noun());
        }

        await page.getByRole('button', { name: 'Create' }).click();

        await page.waitForTimeout(2000);

    });


    test('MANAGE_DOCUMENT, i should be able to move a document to another folder', async ({ page, baseURL }) => {
        await page.locator('.MuiListItemIcon-root.document-list--item-icon.css-133pyj9').nth(1).click();

        await page.getByRole('button', { name: 'More Options' }).nth(0).click();

        await page.getByRole('menuitem', { name: 'Move' }).click();

        await page.getByLabel('', { exact: true }).click();

        const secondOption = await page.locator('.MuiMenuItem-root').first();

        await secondOption.click();

        await page.getByRole('button', { name: 'Move' }).click();

        await page.waitForTimeout(2000);

        const moveText = await page.locator("text=Document Information updated");
        await expect(moveText).toBeVisible();
    });

    test('MANAGE_DOCUMENT, i should be able to add a new document thats made from our text editor', async ({ page, baseURL }) => {
        const dummyText = faker.word.noun();

        const firstFolderButton = page.getByRole('button', { name: 'Add Your First Folder' });
        if (await firstFolderButton.isVisible()) {
            await firstFolderButton.click();
            await page.getByText('Add Document').click();
            await page.locator('#title').fill(dummyText);
        } else {
            await page.getByRole('button', { name: 'Add New' }).click();
            await page.getByRole('menuitem', { name: 'Document' }).click();
            await page.getByRole('combobox').click();
            await page.getByLabel('Location').getByText('/', { exact: true }).click();
            await page.locator('#title').fill(dummyText);
        }

        await page.getByRole('button', { name: 'Create' }).click();

        await page.waitForTimeout(3000);

        await page.getByRole('button', { name: 'Start Editing' }).click();

        await page.waitForTimeout(1000);

        await page.locator('.MuiGrid-root > div > .MuiButtonBase-root').click();

        await page.getByText('text...').click();
        await page.locator('div').filter({ hasText: /^text\.\.\.$/ }).nth(2).fill('mytext');

        await page.waitForTimeout(2000);

        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByRole('button', { name: 'Publish' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();

        const createdText = await page.locator("text=Document state transitioned to published");

        await expect(createdText).toBeVisible();
    });

    test('MANAGE_DOCUMENT, i should be able to duplicate a document', async ({ page, baseURL }) => {
        const dummyText = faker.word.noun();

        const firstFolderButton = page.getByRole('button', { name: 'Add Your First Folder' });
        if (await firstFolderButton.isVisible()) {
            await firstFolderButton.click();
            await page.getByText('Add Document').click();
            await page.locator('#title').fill(dummyText);
        } else {
            await page.getByRole('button', { name: 'Add New' }).click();
            await page.getByRole('menuitem', { name: 'Document' }).click();
            await page.getByRole('combobox').click();
            await page.getByLabel('Location').getByText('/', { exact: true }).click();
            await page.locator('#title').fill(dummyText);
        }

        await page.getByRole('button', { name: 'Create' }).click();

        await page.waitForTimeout(2000);

        await page.getByRole('button', { name: 'Start Editing' }).click();

        await page.waitForTimeout(1000);

        await page.locator('.MuiGrid-root > div > .MuiButtonBase-root').click();

        await page.getByText('text...').click();
        await page.locator('div').filter({ hasText: /^text\.\.\.$/ }).nth(2).fill('mytext');

        await page.waitForTimeout(2000);

        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByRole('button', { name: 'Publish' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();

        await page.getByTitle(dummyText).click();

        await page.getByRole('button', { name: 'More Options' }).nth(0).click();

        await page.getByRole('menuitem', { name: 'Duplicate Document' }).click();

        await page.getByRole('button', { name: 'Yes' }).click();

        const duplicateText = await page.locator("text=Document Duplicated");

        await expect(duplicateText).toBeVisible();
    });

    test('MANAGE_DOCUMENT, i should be able to edit a document and save the changes', async ({ page, baseURL }) => {
        const dummyText = faker.word.noun();

        await page.locator('.MuiListItemIcon-root.document-list--item-icon.css-133pyj9').nth(1).click();

        await page.getByRole('button', { name: 'More Options' }).nth(0).click();

        await page.getByRole('menuitem', { name: 'Edit Document' }).click();

        await page.locator('#title').fill(dummyText);

        await page.getByRole('button', { name: 'Update' }).click();

        await page.waitForTimeout(1000);

        const editText = await page.locator("text=Document Information updated");
        await expect(editText).toBeVisible();

        await page.locator('.flex > .MuiAvatar-root').click();
        await page.getByRole('button', { name: 'Logout' }).click();

        await login(process.env.READEMAIL!, process.env.READPASSWORD!)({ page });

        await expect(page).toHaveURL(/CLIENT/);

        await page.getByRole('button', { name: 'Document Library' }).click();

        const shownText = await page.locator("text=Oh, oh. Nothing here yet");
        await expect(shownText).toBeVisible();
    });
})
