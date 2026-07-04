const playwright = require('playwright');
(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://zigzag.lk/collections/clothing', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  const tests = [
    'div.product-collection__title.mb-3 h4 a',
    'div.product-card a',
    'div.product-item a',
    'article a',
    'div.card a',
    'div.products a',
    'section a',
  ];

  for (const sel of tests) {
    const count = await page.locator(sel).count();
    console.log(`selector ${sel} => ${count}`);
  }

  const productAnchors = await page.locator('div[data-product-id] a').allTextContents().catch(() => []);
  console.log('data-product-id anchors count', productAnchors.length);

  const firstTitles = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('a')).slice(0, 50);
    return nodes.map(a => ({ text: a.textContent?.trim(), href: a.href, classes: a.className }));
  });
  console.log('first 50 anchors', JSON.stringify(firstTitles, null, 2));

  await browser.close();
})();
