import { test, expect, request } from "@playwright/test";
import testData from '../assignment_3/users.json' with { type: 'json' };
import Utils from './Utils';
import POManager from './POManager';

const usersData = JSON.parse(JSON.stringify(testData));

// The below test will run for all the data sets in the users.json file.

for (const user of usersData) {

    test(`Client App login and logout (success full check) for ${user.username}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validateLogin(user.username, user.password);
        await loginPage.validateLogout();
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
        await loginPage.validateLogout();
    })

    test.skip(`Client App Logout failed simulation for ${user.username}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validateLogin(user.username, user.password);
        await loginPage.validateLogoutFailed(); 
    })
}