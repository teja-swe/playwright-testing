const playwright = require('playwright');
(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://zigzag.lk/collections/clothing', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  const scrollEls = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('*'));
    return els
      .filter(el => {
        const style = window.getComputedStyle(el);
        return ['auto','scroll','overlay'].includes(style.overflowY) || ['auto','scroll','overlay'].includes(style.overflow);
      })
      .map(el => ({
        tag: el.tagName,
        id: el.id,
        cls: el.className,
        overflowY: window.getComputedStyle(el).overflowY,
        overflow: window.getComputedStyle(el).overflow,
        scrollTop: el.scrollTop,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        bounds: el.getBoundingClientRect().height,
        containsProductLink: !!el.querySelector('div.product-collection__title.mb-3 h4 a'),
        containsAnyLink: !!el.querySelector('a'),
      }))
      .sort((a,b) => b.scrollHeight - a.scrollHeight)
      .slice(0, 20);
  });
  console.log(JSON.stringify(scrollEls, null, 2));
  const productContainers = await page.evaluate(() => {
    const selectors = [
      'div.product-collection__item',
      'div.product-collection__title.mb-3 h4 a',
      'div.product-collection',
      'div.grid',
      '.product',
      '.collection',
    ];
    const info = [];
    for (const sel of selectors) {
      const els = Array.from(document.querySelectorAll(sel));
      info.push({ selector: sel, count: els.length, sample: els.slice(0,3).map(el => ({ tag: el.tagName, cls: el.className, text: el.textContent?.trim().slice(0,50) })) });
    }
    return info;
  });
  console.log(JSON.stringify(productContainers, null, 2));
  await browser.close();
})();
