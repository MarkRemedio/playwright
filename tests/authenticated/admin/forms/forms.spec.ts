import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test.use({
    adminemail: process.env.ADMINEMAIL,
    adminpassword: process.env.ADMINPASSWORD,
    workeremail: process.env.WORKEREMAIL,
    workerpassword: process.env.WORKERPASSWORD
});

test('after submitting a form, it will show up in the todo list of the user its assigned to', 
  async ({ page, baseURL, adminemail, adminpassword, workeremail, workerpassword  }) => {
  await login(adminemail, adminpassword)({ page });

  const home = await page.locator("text=Home");
  await expect(home).toBeVisible();
  
  await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!);
  const todoTxt = await page.locator("text=My To Do List");
  await expect(todoTxt).toBeVisible();
  
  const formsLibrary = page.locator('#primary-nav').getByRole('button', { name: 'Forms Library' });
  await formsLibrary.click();

  const formName = "Sample Forms";
  const form = await page.getByText(formName);
  await form.click();
  const addIcon = await page.getByRole('main').getByTestId('AddIcon');
  await addIcon.click();
  const firstOption = await page.locator('[data-option-index="0"]').first();
    await firstOption.click();
  const backdrop = await page.locator('.MuiBackdrop-root');
  await backdrop.click();

  const saveFormButton = await page.getByRole('button', { name: 'Save' });
  await saveFormButton.click();
  const viewFormButton = await page.getByRole('button', { name: 'View Form' });
  await expect(viewFormButton).toBeVisible({ timeout: 100000 });
  await viewFormButton.click();

  const personIcon = await page.getByTestId('PersonIcon');
  await personIcon.click();
  const logoutButton = await page.getByRole('button', { name: 'Logout' });
  await logoutButton.click();

  await login(workeremail, workerpassword)({ page });

  const outstandingForm = await page.getByRole('heading', { name: 'Outstanding Forms' });
  await outstandingForm.click();
  const formNameOutstanding = await page.getByText(formName).first();
  await expect(formNameOutstanding).toBeVisible();
});
