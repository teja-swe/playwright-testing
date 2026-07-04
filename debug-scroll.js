const playwright = require('playwright');
(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://zigzag.lk/collections/clothing', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  const selector = 'div.product-collection__title.mb-3 h4 a';
  console.log('initial count', await page.locator(selector).count());
  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(2000);
    console.log('after scroll', i + 1, await page.locator(selector).count());
  }
  console.log('load more visible', await page.locator('button:has-text("Load More")').count());
  console.log('cards count', await page.locator('div.product-collection').count());
  console.log('all anchors count', await page.locator('a').count());
  await browser.close();
})();
