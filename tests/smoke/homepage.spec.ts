import { test, expect } from '../fixtures/base';

test.describe('Smoke tests - home page', () => {
  test('homepage loads and key areas are present', async ({ homePage }) => {
    await homePage.expectLoaded();
    await expect(homePage.clothingLink).toHaveCount(1);
    await expect(homePage.searchBox).toHaveCount(1);
  });
});
