import { test, expect } from '../fixtures/base';

test.describe('Regression tests - catalog', () => {
  test('opens clothing category and shows product cards', async ({ homePage, clothingPage }) => {
    await homePage.openClothingPage();
    await clothingPage.expectLoaded();

    const titles = await clothingPage.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });
});
