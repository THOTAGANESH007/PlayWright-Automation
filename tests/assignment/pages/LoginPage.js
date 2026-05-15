import { expect } from "@playwright/test";
class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signOutButton = page.getByText('Sign Out');
        this.logOutLocator = page.locator('li button');
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async login(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
        await expect(this.page).toHaveURL(/\/dashboard\/dash$/);
    }

    async logout() {
        // Visibility Checkfor signout button
        await expect(this.signOutButton).toBeVisible();
        await this.logOutLocator.last().click();
        await expect(this.page).toHaveURL(/\/auth\/login$/);
    }
}

export default LoginPage;