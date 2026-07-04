import { test, expect } from '@playwright/test';

test("Validate multiple names", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Example dataset of names
//   const testData = [
//     { locator: page.getByPlaceholder("Enter Name"), value: "Teja" },
//     { locator: page.getByPlaceholder("Enter EMail"), value: "abc14@gmail.in" },
//     { locator: page.getByPlaceholder("Enter Phone"), value: "9494812009" },
//     // add more entries here...
//   ];

//   for (const { locator, value } of testData) {
//     await locator.fill(value);
//     await expect(locator).toHaveValue(value);
//   }

let title1:string= await page.title();
console.log("Title", title1)

await page.getByRole("textbox", { name : "Enter Name"}).fill("teja")
await page.getByRole("textbox", {name: "Enter Email"}).fill("abc14@gmail.com")
await page.getByRole("textbox", {name: "Enter Phone"}).fill("9494812009")
await page.getByRole("textbox",{name: "Address"}).fill("3-156,");
await page.getByLabel('Male').click();
await page.getByRole("checkbox", {name: "Monday"})
const countryDropdown = await page.getByRole("combobox", {name : 'Country:'})
await countryDropdown.selectOption('India');
await page.getByRole("option", {name : "Red"})
await page.waitForTimeout(5000);
});
