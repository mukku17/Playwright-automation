const {test,expect} = require("@playwright/test");
const { text } = require("node:stream/consumers");
test('selectDropdown', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('#username').fill('Mukesh');
    await page.locator('#password').fill('Tester123')
    const dropdown = await page.locator('select.form-control');
    await dropdown.selectOption("consult");
    await page.locator('.radiotextsty').last().check();
    
    //assersion
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    
    await page.getByRole('button', {name:'Okay'}).click();
    await page.locator('#terms').check();
    //assersion
    await page.locator('#terms').toBeChecked;
    //expect (await page.locator('#terms').isChecked()).toBeFalsy();



}
);
test('child windows', async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const documentLink = await page.getByRole('link', {name: 'Free Access to InterviewQues'})
    const [newPage]= await Promise.all(
    [context.waitForEvent('page'),
    documentLink.click()
    ]);
    const text = await newPage.getByText('Please email us at mentor@').textContent();
    console.log(text);

    await page.pause()
});