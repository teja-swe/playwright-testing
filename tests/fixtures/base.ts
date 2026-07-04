import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ClothingPage } from '../../pages/clothingPage';

export type TestFixtures = {
  homePage: HomePage;
  clothingPage: ClothingPage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },

  clothingPage: async ({ page }, use) => {
    const clothingPage = new ClothingPage(page);
    await use(clothingPage);
  },
});

export { expect } from '@playwright/test';
