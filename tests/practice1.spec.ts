import { test, expect } from './fixtures/base';

test.describe('Zigzag regression suite', () => {
  test('homepage loads and displays core navigation', async ({ homePage }) => {
    await homePage.expectLoaded();
    await expect(homePage.clothingLink).toBeVisible();
    await expect(homePage.searchBox).toBeVisible();
  });

  test('landing on clothing category shows products', async ({ homePage, clothingPage }) => {
    await homePage.openClothingPage();
    await clothingPage.expectLoaded();

    const titles = await clothingPage.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });
});
