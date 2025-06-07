import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { fakeClient } from "tests/constants";
import login from "../../../../utilities/login";

/* eslint-disable quotes, prettier/prettier*/
test("i should be able to update tenant information", async ({ page, baseURL }) => {
  await login(process.env.ADMINEMAIL!, process.env.ADMINPASSWORD!)({ page });

  const shortCode = process.env.ADMINSHORTCODE!;
  await expect(page).toHaveURL(new RegExp(shortCode));
  const home = await page.locator("text=Home");
  await expect(home).toBeVisible();

  await page.goto(baseURL + "/t/"+process.env.CLIENTSHORTCODE!);
  const todoTxt = await page.locator("text=My To Do List");
  await expect(todoTxt).toBeVisible();

  const client = fakeClient;
  await page.getByRole("button", { name: "Admin" }).click();
  await page.locator('[id="tenant\\.name"]').fill(client.companyname);
  await page
    .locator('input[name="tenant\\.address\\.0\\.city"]')
    .fill("Ontario");

  await page.locator('[id="tenant\\.contactInformation\\.0\\.supportEmail"]')
    .fill(faker.internet.email());

  await page.locator('[id="tenant\\.contactInformation\\.0\\.supportPhone"]')
    .fill(faker.number.int({ max: 1000000000 }).toString());
  await page.getByRole("button", { name: "Update Client" }).click();
  const updateMessage = await page.locator("#notistack-snackbar");
  const text = await updateMessage.textContent();
  await expect(text).toBe("Client " + process.env.CLIENTSHORTCODE + " has been updated");

  const tenantName = await page.locator('[id="tenant\\.name"]');
  await expect(tenantName).toBeVisible();
  await expect(tenantName).toHaveValue(client.companyname);

});
