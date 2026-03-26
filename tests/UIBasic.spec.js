const { test, expect } = require('@playwright/test');
const { log } = require('node:console');
const { type } = require('node:os');

test('Browser context playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    
    //** @type {import('@playwright/test').Page} */ // <--- Ye line add karein
    const page = await context.newPage();

    // Ab niche 'page.' likhte hi locator() ka suggestion aa jayega
    await page.goto("https://automationexercise.com/");
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await page.getByPlaceholder('Name').fill('Mukesh');
    // data-qa: A custom data attribute used as a stable 'Test Anchor' to uniquely identify elements, making tests resilient to UI/layout changes.
    await page.locator('[data-qa="signup-email"]').fill('traddingacc8@gmail.com');
    await page.getByRole('button',{name:'Signup'}).click();
    const checke= await page.getByRole('radio', {name: 'Mr.'}).check();
    await page.getByRole('textbox',{name:'Password'}).fill('Tester123')
    await page.locator('[data-qa="days"]').selectOption('15');
    await page.locator('[data-qa="months"]').selectOption('March');
    await page.locator('[data-qa="years"]').selectOption('2000');
    await page.getByRole('checkbox',{name: "Sign up for our newsletter!"}).check();
    await page.getByRole('checkbox',{name: "Receive special offers from our partners!"}).check();
    await page.getByRole('textbox',{name:"First name"}).fill("mukesh");
    await page.getByRole('textbox',{name:"Last name"}).fill("Singh");
    await page.locator('[data-qa="address"]').fill("bageshwar")
    await page.locator('[data-qa="country"]').selectOption('Canada');
    await page.getByRole('textbox',{name:"State"}).fill("Uttarakhand");
    await page.getByRole('textbox',{name:"City"}).fill("bageshwar");
    await page.locator('[data-qa="zipcode"]').fill("263619");
    await page.getByRole('textbox',{name:"Mobile Number "}).fill("8535055858");
    await page.getByRole('button', {name:"Create Account"}).click();
    await expect(page.getByText('Account Created!')).toBeVisible();
    console.log("sucess:Account created");
    
    await page.pause();
});

test('Login',async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://automationexercise.com/");

    //page title
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await page.locator('[data-qa="login-email"]').fill("traddingacc8@gmail.com");
    await page.getByPlaceholder("Password").fill("Tester123")
    await page.getByRole('button',{name:'Login'}).click()
v 
    //Successfully logged in
    await expect(page.getByText('Logged in as')).toBeVisible();

    //await page.getByRole('link', { name: 'View Product' }).nth(1).click()
    const newhover = await page.getByAltText('ecommerce website products').nth(1);
    await newhover.hover();
    await expect(newhover).toBeVisible();
    await page.getByText('Add to cart').nth(3).click();
    await page.getByRole('button',{name: 'Continue Shopping'}).click();
    
    
    //await page.pause();
    


});