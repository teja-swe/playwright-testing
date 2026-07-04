import { test } from '@playwright/test';

test("Check checkout", async ({page}) => {
await page.goto("https://zigzag.lk/");

await page.waitForSelector('.easw-closeButtonDiv button', { state: 'visible' });
await page.click('.easw-closeButtonDiv button');


// Now fill
await page.fill('#PopupCustomerEmail', 'developerteja11@gmail.com');
await page.fill('#PopupCustomerPassword', 'Sunny@14');

} )


