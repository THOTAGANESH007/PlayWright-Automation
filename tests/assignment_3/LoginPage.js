import { expect } from "@playwright/test";
class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");

    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validateLogin(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
        await expect(this.page).toHaveURL(/\/dashboard\/dash$/);
    }

    async validateLogout() {
        // Visibility Checkfor signout button
        await expect(this.page.getByText('Sign Out')).toBeVisible();
        await this.page.locator('li button').last().click();
        await expect(this.page).toHaveURL(/\/auth\/login$/);
    }

    async validateLogoutFailed() {
        // It waits for the 77 seconds (default timeout) and as the session expires the test fails,
        //  it stores the trace and also gives the html report.

        // visibility check for signout button
        await expect(this.page.getByText('Sign Out')).toBeVisible();

        await this.page.locator('li btn').last().click();
        // await expect(this.page).toHaveURL(/\/dashboard\/dash$/);
    }

}

export default LoginPage;