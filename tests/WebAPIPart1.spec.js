import { test, expect, request } from "@playwright/test";
import APiUtils from '../utils/APiUtils';
const loginPayLoad = { userEmail: "jaibalayya@gmail.com", userPassword: "J@ibalayy1" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };


let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('@API Place the order', async ({ page }) => {

    // Set the token in local storage before navigating to the page
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/myorders");
    //  await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    console.log("Rows:", await rows.count());

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("Row Order ID:", rowOrderId);
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    // await page.pause();
    const orderIdDetails = await page.locator(".col-text").textContent();
    await expect(page.getByText('Order Id')).toBeVisible();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

//Verify if order created is showing in history page
// Precondition - create order -