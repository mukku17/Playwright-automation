const {test, expect } = require("@playwright/test");

test.only('login', async({page})=> {
    const productname = 'iphone 13 pro';
    const product = page.locator(".card-body")
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.getByPlaceholder('email@example.com').fill('mukulnagarkoti009@gmail.com')
    await page.getByPlaceholder('enter your passsword').fill('Tester@123')
    await page. locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const alltest = await page.locator('.card-body b').allTextContents()
    console.log(alltest);
    const count = await product.count();
    for (let i = 0; i < count; i++) {
    if(await product.nth(i).locator("b").textContent() === productname){
        await product.nth(i).locator("text=Add To Cart").click();
        break;
    }   
    }
    await page.locator("[routerlink='/dashboard/cart']").click();

    await expect (page.getByText(productname)).toBeVisible();


    //Checkout
    await page.getByRole('button', {name: "Checkout"}).click();

    await page.locator('input.txt.text-validated').first().fill("8767676767");
    await page.locator('.input.ddl').first().selectOption('12')
    await page.locator('.input.ddl').nth(1).selectOption('17')

    await page.locator('.input.txt').nth(1).fill('546')
    await page.locator('.input.txt').nth(2).fill('Mukesh')

    //pressSequentially(): Ek ek character type karta hai, autocomplete/keyboard events trigger karne ke liye
    await page.locator('.input.txt.text-validated').nth(2).pressSequentially('IND')
    await page.getByText('India', {exact: true}).click();


    //check both username are same
    //Yaad rakho: Koi bhi assertion hamesha await expect(locator).assertion() format me likhte hain ✅
    await expect(page.locator('.user__name [type="text"]').first()).toHaveText('mukulnagarkoti009@gmail.com')

    //submit
    await page.getByText('Place Order').click();

    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
    const ID = await page.locator('.ng-star-inserted').nth(2).textContent();
    console.log("Order id =" +ID);
    



    //await page.pause();
    

})