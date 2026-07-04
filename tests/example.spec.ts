import { test, expect } from '@playwright/test';

test("book a ticket", async ({ page }) => {
  await page.goto("https://www.makemytrip.com/");

  // Wait for popup close button (appears late)
  const closeBtn = page.locator("[data-cy='closeModal']");
  await closeBtn.waitFor({ state: 'visible', timeout: 15000 }); // wait up to 15s
  await closeBtn.click();
  await expect(closeBtn).toBeHidden();

  // Pause to visually confirm popup closed
  await page.waitForTimeout(2000);

  // Click Flights link
  await page.click("text=Flights");
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Select Round Trip
  await page.getByText("Round Trip", { exact: true }).click();
  await page.waitForTimeout(2000);

  // Click the readonly From field to activate autosuggest
  await page.locator('#fromCity').click();

  // Now the autosuggest input appears
  const fromInput = page.locator('input.react-autosuggest__input');
  await fromInput.waitFor({ state: 'visible' });
  await fromInput.fill('Hyderabad');

  // Select suggestion
  await page.locator('#react-autowhatever-1 .revampedPopularSuggestionItem', { hasText: 'Hyderabad' }).click();

  await page.waitForTimeout(2000);
});
