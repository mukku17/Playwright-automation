const {test,expect }=require('@playwright/test');
test('Sign up', async({page}) =>{

    
    await page.goto('https://rahulshettyacademy.com/client/#/auth/register')
    await page.getByPlaceholder("First Name").fill('Mukesh Singh');
    await page.getByPlaceholder("Last Name").fill('NagarKoti');
    await page.getByPlaceholder("email@example.com").fill('mukulnagarkoti009@gmail.com');
    await page.getByPlaceholder("enter your number").fill('9568892014');
   // await page.getByRole('combobox').click();
    //await page.locator('select').selectOption('Engineer');
    //await page.getByPlaceholder("Choose your occupation").click();
    await page.getByRole('combobox').selectOption('Engineer');
    await page.getByRole('radio', {name: "Male", exact: true}).check();
    await page.getByPlaceholder("Passsword", { exact: true }).fill('Tester@123');
    await page.getByPlaceholder("Confirm Passsword").fill('Tester@123');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Register' }).click();


    

    
 


    await page.pause()
})