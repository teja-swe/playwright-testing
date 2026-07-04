import { test, expect } from '../fixtures/base';

test.describe('Regression tests - Clothing catalog', () => {
  test('extracts product titles from the first catalog page', async ({ homePage, clothingPage }) => {
    await homePage.openClothingPage();
    await clothingPage.expectLoaded();

    const titles = await clothingPage.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
    console.log('Titles on first page:', titles.slice(0, 10));
  });

  test('paginates through catalog pages and collects titles', async ({ homePage, clothingPage }) => {
    await homePage.openClothingPage();
    await clothingPage.expectLoaded();

    const collected: string[] = [];
    let nextUrl = 'https://zigzag.lk/collections/clothing';
    let pageIndex = 0;

    while (nextUrl && pageIndex < 5) {
      pageIndex += 1;
      await homePage.page.goto(nextUrl, { waitUntil: 'domcontentloaded' });
      await homePage.dismissPopupIfVisible();
      await clothingPage.waitForProducts();

      const titles = await clothingPage.getProductTitles();
      collected.push(...titles);
      console.log(`Page ${pageIndex} titles:`, titles.length);

      const nextHref = await clothingPage.getNextPageHref();
      if (!nextHref) break;
      nextUrl = new URL(nextHref, homePage.page.url()).toString();
    }

    expect(collected.length).toBeGreaterThan(0);
    console.log('Collected product titles:', collected.length);
  });
});
