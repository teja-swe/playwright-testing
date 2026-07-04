import { test, expect } from '../fixtures/base';

test.describe('Smoke tests - Home page', () => {
  test('homepage loads and key elements are present', async ({ homePage }) => {
    await homePage.expectLoaded();
    await expect(homePage.clothingLink).toHaveCount(1);
    await expect(homePage.searchBox).toHaveCount(1);
  });

  test('user can open the clothing category', async ({ homePage, clothingPage }) => {
    await homePage.openClothingPage();
    await clothingPage.expectLoaded();
  });
});
