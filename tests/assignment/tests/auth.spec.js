import { test, expect, request } from "@playwright/test";
import testData from '../data/users.json' with { type: 'json' };
import Utils from '../utils/Utils';
import POManager from '../pages/POManager';

const usersData = JSON.parse(JSON.stringify(testData));

// The below test will run for all the users in the users.json file.

for (const user of usersData) {

    test(`Client App login and logout (success full check) for ${user.username}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.login(user.username, user.password);
        await loginPage.logout();
    })

    test(`Client App login and logout using token (success full check) for ${user.username}`, async ({ page }) => {
        const apiContext = await request.newContext();
        const apiUtils = new Utils(apiContext, user);
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const token = await apiUtils.getToken();
        await page.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, token);
        await loginPage.goTo();

        // await page.waitForEvent('networkidle'); => This is flaky so I keep waiting the site until it is loaded
        await expect(page).toHaveURL(/.*dashboard\/dash$/);
        await loginPage.logout();
    })

    test(`Client App Logout failed simulation for ${user.username}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const wrongLocatorForLogout = page.locator('li btn');
        await loginPage.goTo();
        await loginPage.login(user.username, user.password);
        await expect(loginPage.signOutButton).toBeVisible();

        await wrongLocatorForLogout.last().click(); // Intentional Failure
        // await expect(page).toHaveURL(/\/dashboard\/dash$/);
    })
}