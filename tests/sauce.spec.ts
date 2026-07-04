import { test, expect } from '@playwright/test';

test("check total products", async ({ page }) => {
  await page.goto('https://zigzag.lk/collections/new-arrivals-1');

  // Get raw text
  const countText = await page.locator('#CollectionProductCount').innerText();
  console.log("Raw text:", countText);

  // Extract digits only
  const match = countText.match(/\d+/);   // regex to capture first number
  const count = match ? parseInt(match[0], 10) : NaN;

  console.log("Total products count:", count);

  // Assert exact match
  expect(count).toBe(269);
  await page.screenshot({path:'screenshot.png'});
  await page.waitForTimeout(4000);
});

test("scroll through products on the page", async ({ page }) => {
  await page.goto('https://zigzag.lk/collections/new-arrivals-1');
  await page.waitForLoadState('domcontentloaded');

  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(1000);
  }

  await expect(page.locator('body')).toBeVisible();
  await page.screenshot({ path: 'scroll-screenshot.png' });
});