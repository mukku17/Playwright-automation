const { test, expect } = require("@playwright/test");

// ✅ Sab hardcoded data ek jagah - easy to maintain
const mail = 'mukulnagarkoti009@gmail.com';
const password = 'Tester@123';
const productname = 'iphone 13 pro';
const cardNumber = '8767676767';
const cvv = '546';
const cardName = 'Mukesh';
const expiryMonth = '12';
const expiryYear = '17';

test('login and place order', async ({ page }) => {

    // ✅ Login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder('email@example.com').fill(mail);
    await page.getByPlaceholder('enter your passsword').fill(password);
    await page.locator("[value='Login']").click();

    // ✅ waitForLoadState hataya, direct waitFor use kiya - jyada reliable
    await page.locator(".card-body b").first().waitFor();

    const allProducts = await page.locator('.card-body b').allTextContents();
    console.log("All Products:", allProducts);

    // ✅ Search Product and add to cart
    const product = page.locator(".card-body");
    const count = await product.count();

    for (let i = 0; i < count; i++) {
        if (await product.nth(i).locator("b").textContent() === productname) {
            await product.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }

    // ✅ Very the product
    await page.locator("[routerlink='/dashboard/cart']").click();
    await expect(page.getByText(productname)).toBeVisible();

    // ✅ Checkout
    await page.getByRole('button', { name: "Checkout" }).click();

    // ✅ Payment details 
    await page.locator('input.txt.text-validated').first().fill(cardNumber);
    await page.locator('.input.ddl').first().selectOption(expiryMonth);
    await page.locator('.input.ddl').nth(1).selectOption(expiryYear);
    await page.locator('.input.txt').nth(1).fill(cvv);
    await page.locator('.input.txt').nth(2).fill(cardName);

    await page.locator('.input.txt.text-validated').nth(2).pressSequentially('IND');
    await page.getByText('India', { exact: true }).click();

    // ✅ Email verify
    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(mail);

    // ✅ Order place 
    await page.getByText('Place Order').click();

    // ✅ Success message verify
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();

    // ✅ Order ID print karo - trim() se extra spaces hataye
    const ID = await page.locator('.ng-star-inserted').nth(2).textContent();
    console.log("Order id = " + ID.trim());

});
