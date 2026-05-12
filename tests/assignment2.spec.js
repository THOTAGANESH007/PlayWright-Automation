import { test, expect } from '@playwright/test';

test.describe('Login Flow Automation', () => {

    // 1. Successful Login
    test('Successful Login', async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/client");

        const email = page.locator("[type='email']");
        await email.fill("jaibalayya@gmail.com");

        const password = page.locator("#userPassword");
        await password.fill("J@ibalayy1");

        const login = page.locator("#login");
        await login.click();

        await expect(page).toHaveURL(
            "https://rahulshettyacademy.com/client/#/dashboard/dash",
        );
    });

    // 2. Invalid Credentials
    test('Invalid Credentials', async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/client");

        const email = page.locator("[type='email']");
        await email.fill("jaibalayya@gmail.com");

        const password = page.locator("#userPassword");
        await password.fill("wrongpassword");

        const login = page.locator("#login");
        await login.click();

        // Expecting an error message to be displayed
        await expect(await page.locator('.toast-message')).toContainText('Incorrect email or password');
    });

    // 3. Locked User Access 
    test('Locked User Access', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('locked_out_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // Error message for locked accounts
        await expect(await page.locator('[data-test="error"]')).toContainText('this user has been locked out');
    });

    // 4. Logout Functionality
    test('Logout Functionality', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/client');
        const email = page.locator("[type='email']");
        await email.fill("jaibalayya@gmail.com");

        const password = page.locator("#userPassword");
        await password.fill("J@ibalayy1");

        const login = page.locator("#login");
        await login.click();
        await page.locator('li button').last().click();

        await expect(page).toHaveURL(/\/auth\/login$/);

        // FORCING A FAILURE HERE: 
        // By expecting a wrong URL, the test fails, generating the "Error Log" and "Trace" artifacts for analysis.
        await expect(page).toHaveURL("https://rahulshettyacademy.com/WRONG_URL_TO_FORCE_FAIL");
    });
    

});
