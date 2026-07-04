const playwright = require('playwright');
(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://zigzag.lk/collections/clothing', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  const html = await page.content();
  const searches = ['Load More', 'load more', 'View More', 'view more', 'Show More', 'show more', 'next', 'page=', 'page \d+', 'pagination', 'data-page', 'load_more', 'more_products'];
  for (const term of searches) {
    const idx = html.indexOf(term);
    if (idx >= 0) {
      console.log(`FOUND ${term} at ${idx}`);
      const snippet = html.slice(Math.max(0, idx - 200), idx + 200);
      console.log(snippet.replace(/\s+/g, ' ').slice(0, 400));
    }
  }
  const buttons = await page.evaluate(() => Array.from(document.querySelectorAll('button, a')).map(el => ({ tag: el.tagName, text: el.textContent?.trim(), ariaLabel: el.getAttribute('aria-label'), class: el.className })).filter(i => i.text || i.ariaLabel));
  console.log('buttons count', buttons.length);
  console.log(JSON.stringify(buttons.slice(0, 100), null, 2));
  await browser.close();
})();
