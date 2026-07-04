import { expect, type Locator, type Page } from '@playwright/test';

export class ClothingPage {
  readonly page: Page;
  readonly title: Locator;
  readonly productCards: Locator;
  readonly nextPageLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1').first();
    this.productCards = page.locator('div.product-collection__title.mb-3 h4 a');
    this.nextPageLink = page.locator('link[rel="next"]').first();
  }

  async waitForProducts() {
    await this.productCards.first().waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
  }

  async getProductTitles() {
    await this.waitForProducts();
    return this.productCards.allTextContents();
  }

  async getNextPageHref() {
    return this.nextPageLink.getAttribute('href').catch(() => null);
  }

  async expectLoaded() {
    await expect(this.page.locator('body')).toContainText(/clothing/i);
  }
}
