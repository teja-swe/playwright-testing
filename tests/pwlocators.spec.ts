import {test,expect} from '@playwright/test'
import Page from '@playwright/test';

// test("chrcking alerts", async({page})=>{
//     await page.goto("https://testautomationpractice.blogspot.com/")
//     page.on('dialog', async(dialog)=>{
//         console.log(dialog.message())
//         expect(dialog.message()).toBe("I am an alert box!")
//     })
//     await page.click("#alertBtn");
// }

// )
// test("checking alerts", async ({ page }) => {
//   await page.goto("https://testautomationpractice.blogspot.com/");

//   // Listen for the alert
//   page.once('dialog', async dialog => {
//     expect(dialog.type()).toBe('alert'); // assert type
//     expect(dialog.message()).toBe("I am an alert box!"); // assert message
//     await dialog.accept(); // close the alert
//   });

//   // Trigger the alert
//   await page.click('#alertBtn');
//   await page.waitForTimeout(5000);
// });

// test("Confirmation alert", async({page})=>{
//     await page.goto("https://testautomationpractice.blogspot.com/")
//     page.once('dialog', async dialog=>{
//         console.log(dialog.type());
//         expect(dialog.type()).toContain('confirm');
//         console.log(dialog.message());
//         expect(dialog.message()).toContain('Press a button!')
//     await dialog.accept();
//     })
//     await page.click("#confirmBtn");
//     const text:string = await page.locator('#demo').innerText()
//     console.log("Confirm text:",text)
//     await expect (page.locator('#demo')).toHaveText('You pressed OK!')
//     await page.waitForTimeout(5000);
// })

test("Prompt Alert check", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Register a dialog handler
  page.once('dialog', async dialog => {
    console.log("Dialog type:", dialog.type());
    expect(dialog.type()).toBe('prompt'); // correct type
    expect(dialog.message()).toContain('Please enter your name:');
    expect(dialog.defaultValue()).toBe('Harry Potter');
    await dialog.accept('Teja'); // send input to prompt
  });

  // Trigger the prompt
  await page.click('#promptBtn');

  // Verify the result text
  const text = await page.locator('#demo').innerText();
  console.log(text);
  await expect(page.locator('#demo')).toContainText('Teja');

  await page.waitForTimeout(5000);
});

test("Confirmation Alert", async ({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/")
  page.once('dialog', async dialog=>{
    console.log(dialog.type())
    expect (dialog.type()).toContain('confirm')
    console.log(dialog.message())
    expect (dialog.message()).toContain('Press a button!')
    await dialog.accept();
    
  })
  await page.locator('#confirmBtn').click();
  const text:string = await page.locator('#demo').innerText();
  await expect (page.locator('#demo')).toHaveText('You pressed OK!')
  await page.waitForTimeout(5000);
}
)

test("Promt Checking", async({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  page.once('dialog', async dialog=>{
    console.log(dialog.type())
    expect (dialog.type()).toContain('prompt')
    console.log(dialog.message())
    expect (dialog.message()).toContain('Please enter your name:')
    console.log(dialog.defaultValue());
    expect (dialog.defaultValue()).toContain('Harry Potter')
    dialog.accept('Teja');
  })
  await page.locator('#promptBtn').click();
  const text:string = await page.locator('#demo').innerText();
  console.log(text);
  await expect (page.locator('#demo')).toHaveText('Hello Teja! How are you today?');
  await page.waitForTimeout(5000);


})

//Frames

test.only("Frames testing", async({page})=>{
  await page.goto("https://ui.vision/demo/iframes")
  const frames = page.frames();
  console.log(frames.length)
}

)