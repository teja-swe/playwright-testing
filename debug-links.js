const playwright = require('playwright');
(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://zigzag.lk/collections/clothing', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  const productLinkCount = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a'))
      .filter(a => a.href.includes('/products/'))
      .map(a => a.href)
      .filter((v, i, arr) => arr.indexOf(v) === i)
      .length;
  });
  console.log('product link count', productLinkCount);

  const hiddenProductLinks = await page.evaluate(() => {
    const ids = Array.from(document.querySelectorAll('a'))
      .filter(a => a.href.includes('/products/'))
      .filter(a => a.closest('[style*="display:none"], [hidden], [aria-hidden="true"]') || window.getComputedStyle(a).display === 'none' || window.getComputedStyle(a).visibility === 'hidden')
      .map(a => a.href);
    return ids.slice(0, 20);
  });
  console.log('hidden product links sample', hiddenProductLinks);

  const bottomButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a')).map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim().slice(0,60),
      href: el.href || null,
      class: el.className,
      style: window.getComputedStyle(el).cssText,
      visible: el.offsetParent !== null,
    })).filter(b => /load more|next|view more|show more|more|page/i.test(b.text || ''));
  });
  console.log('bottom navigation', JSON.stringify(bottomButtons, null, 2));

  const productContainers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).filter(a => a.href.includes('/products/')).slice(0, 50).map(a => ({
      text: a.textContent?.trim(),
      href: a.href,
      classes: a.className,
      parentClasses: a.parentElement?.className || null,
      parentTag: a.parentElement?.tagName || null,
      grandParentClasses: a.parentElement?.parentElement?.className || null,
      grandParentTag: a.parentElement?.parentElement?.tagName || null,
    }));
  });
  console.log('sample product containers', JSON.stringify(productContainers.slice(0, 15), null, 2));

  await browser.close();
})();
