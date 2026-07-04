import {test,expect} from "@playwright/test"

// test("Smokie Testing", async({page}) =>{
//     await page.goto("https://www.saucedemo.com/")
//     await page.getByRole("textbox",{name: 'Username'}).fill('standard_user');
//     await page.getByPlaceholder("Password").fill('axat_sauce');
//     await page.getByLabel("button"),{name:'Login',exact:true}
//     await page.waitForTimeout(3000);


// }
// )

test ("Compare item price", async ({ page }) => {
  await page.goto("https://www.amazon.in/");
  await page.waitForTimeout(3000);

  // Fill the search bar
  await page.locator("#twotabsearchtextbox").fill("POCO M7 Plus 5G (Carbon Black, 128 GB) (6 GB RAM)");
  await page.keyboard.press("Enter"); // Press Enter to search

  // Click the first product link
  await page.getByRole("link", { name: /M7 Plus 5G/ }).first().click();

  await page.waitForTimeout(3000);

});


test("Get Amazon product title", async ({ page }) => {
  // Navigate directly to the product detail page
  await page.goto("https://www.amazon.in/POCO-M7-Plus-5G-Carbon/dp/B0FRNNP6F5");

  // Wait until the product title is visible
  const titleLocator = page.locator("span#productTitle");
  await expect(titleLocator).toBeVisible();

  // Get the text
  const title = (await titleLocator.innerText()).trim();
  console.log("Product Title:", title);

  expect(title).toContain("M7 Plus 5G");

  // Get price 
  const price = await page.locator('#corePriceDisplay_desktop_feature_div .a-price-whole').innerText();
  console.log("Product Price:", price);
});


test.only("Flipkart Search", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  await page.getByRole("textbox", { name: "Search for products, brands and more" }).fill("poco m7 plus");
  await page.keyboard.press("Enter");

  // Click the first product link in search results
  await page.locator('a.k7wcnx').first().click();

  // Wait for navigation to product detail page
  await page.waitForLoadState('domcontentloaded');

  // Now .B_NuCI exists
//   const title = await page.locator('.B_NuCI').innerText();
//   console.log("Title:", title);

//   expect(title).toContain("POCO M7 Plus 5G");
    const price = await page.locator('._30jeq3').first().innerText();
    console.log("Price:", price);


});