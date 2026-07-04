import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly clothingLink: Locator;
  readonly searchBox: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('body').filter({ hasText: /zigzag/i }).first();
    this.clothingLink = page.locator('a[href*="/collections/clothing"]').filter({ hasText: /clothing/i }).first();
    this.searchBox = page.locator('input[type="search"], input[placeholder*="search" i], input[aria-label*="search" i]').first();
    this.cartIcon = page.locator('a[href*="cart"], button[aria-label*="cart" i]').first();
  }

  async goto() {
    await this.page.goto('https://zigzag.lk/', { waitUntil: 'domcontentloaded' });
    await this.dismissPopupIfVisible();
  }

  async dismissPopupIfVisible() {
    const candidates = [
      this.page.getByRole('button', { name: /click here|close|dismiss|skip|no thanks/i }),
      this.page.locator('button').filter({ hasText: /click here|close|dismiss|skip|no thanks/i }).first(),
      this.page.locator('[aria-label*="close" i]').first(),
    ];

    for (const candidate of candidates) {
      try {
        await candidate.waitFor({ state: 'visible', timeout: 3000 });
        await candidate.click();
        break;
      } catch {
        // ignore if absent
      }
    }
  }

  async openClothingPage() {
    await this.page.goto('https://zigzag.lk/collections/clothing', { waitUntil: 'domcontentloaded' });
    await this.dismissPopupIfVisible();
    await this.page.waitForLoadState('load').catch(() => {});
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle(/zigzag|clothing/i);
    await expect(this.page.locator('body')).toBeVisible();
    await expect(this.page.locator('body')).toContainText(/zigzag|clothing/i);
  }
}
