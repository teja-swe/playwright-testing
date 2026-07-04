const playwright = require('playwright');
(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://zigzag.lk/collections/clothing', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  console.log('frames:', page.frames().map(f => ({ name: f.name(), url: f.url() })));
  console.log('main frame title', await page.title());
  const productEls = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('div.product-collection__title.mb-3 h4 a'));
    return els.map(el => {
      const parent = el.closest('div');
      return {
        text: el.textContent?.trim(),
        href: el.href,
        outer: el.outerHTML,
        parentClass: parent?.className || null,
        parentTag: parent?.tagName || null,
        grandParentClass: parent?.parentElement?.className || null,
        grandParentTag: parent?.parentElement?.tagName || null,
        rootNearest: el.closest('section, div, main, article')?.className || el.closest('section, div, main, article')?.tagName,
      };
    });
  });
  console.log(JSON.stringify(productEls.slice(0, 5), null, 2));

  const bodyScroll = await page.evaluate(() => ({ scrollHeight: document.body.scrollHeight, clientHeight: document.documentElement.clientHeight, innerHeight: window.innerHeight }));
  console.log('body scroll', bodyScroll);
  await browser.close();
})();
