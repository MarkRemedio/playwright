import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import login from "../../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test("i should be able to create custom field groups - i should be able to edit custom field groups", async ({ page, baseURL }) => {
  await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });

  const shortCode = process.env.ADMINSHORTCODE!;
  await expect(page).toHaveURL(new RegExp(shortCode));
  const home = await page.locator("text=Home");
  await expect(home).toBeVisible();

  await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!);
  const todoTxt = await page.locator("text=My To Do List");
  await expect(todoTxt).toBeVisible();

  await page.getByRole("button", { name: "Admin" }).click();
  await page.getByText("Field Groups").click(); // TODO Replace
  await page.getByRole("button", { name: "Create Field Group" }).click();
  await page.locator("#label").fill(faker.word.noun());
  await page.locator("#description").fill(faker.word.sample());
  await page.locator("#max").fill("10");
  await page.getByRole("button", { name: "Create" }).click();

  const fieldGrpSuccessMsg = await page.getByText("Field Group Created", {
    exact: true,
  });
  await expect(fieldGrpSuccessMsg).toBeVisible();

  await expect(page).toHaveURL(/edit/);

  await page.locator("#label").fill(faker.word.noun() + "edited");
  await page.getByRole("button", { name: "Save" }).click();

  const fieldGrpSuccessMsg2 = await page.getByText("Field Group Updated");
  await expect(fieldGrpSuccessMsg2).toBeVisible();
});
