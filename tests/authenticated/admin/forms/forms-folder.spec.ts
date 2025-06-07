import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import login from "../../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test.describe("Admin Forms - Form Library", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });
  
    const shortCode = process.env.ADMINSHORTCODE!;
    await expect(page).toHaveURL(new RegExp(shortCode));
    const home = await page.locator("text=Home");
    await expect(home).toBeVisible();
  
    await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!);
    const todoTxt = await page.locator("text=My To Do List");
    await expect(todoTxt).toBeVisible();
  
    await page.locator('#primary-nav').getByRole("button", { name: 'Forms Library' }).click();
  });

  test("i should be able to create a form folder", async ({ page, baseURL }) => {
    const formName = faker.word.noun();
    await page.getByRole("button", { name: "Add New Folder" }).click();
    await page.getByRole("textbox", { name: "Folder Name" }).fill(formName);
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page.getByRole("listitem").filter({ hasText: formName })).toBeVisible();
  });
  
  test('i should be able to add a form to a library', async ({ page }) => {
      
    const formItemFavList = await page.locator('[data-test="form-item"]').first();
    const starIcon = formItemFavList.locator('[data-testid="MoreVertIcon"]');
    await starIcon.isVisible();
    await starIcon.click();
  
    await page.getByRole('heading', { name: 'Add To/Remove From Folder' }).click();
    await page.getByRole('checkbox').first().check();
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByText('Folder Updated!')).toBeVisible();
  });
});

