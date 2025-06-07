import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test.describe("Forms - Form Library", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await login(process.env.WORKEREMAIL!, process.env.WORKERPASSWORD!)({ page });
    await page.locator('#primary-nav').getByRole('button', { name: 'Forms Library' }).click();
  });

  test('i should be able to favor a form', async ({ page }) => {
    await page.getByText('Favorites').click();
    const formItemFavList = await page.locator('[data-test="form-item"]').all();

    for (let i = 0; i < formItemFavList.length; i++) {
      const formItem = formItemFavList[i];
      const starIcon = formItem.locator('[data-testid="StarIcon"]');
      if (await starIcon.isVisible()) {
        await starIcon.click({ force: true });
        await page.waitForTimeout(300);
      }
    }
    
    await page.getByText('All Forms').click();
    const formItemDiv = await page.locator('[data-test="form-item"]').first();
    const pText = await formItemDiv.locator('[data-test="form-item-label"]').textContent();
    await formItemDiv.locator('[data-testid="StarIcon"]').locator('path').click();
    await page.waitForTimeout(10000);
    await page.getByText('Favorites').click();
    await page.getByText(pText!).isVisible();
  });

  
});
