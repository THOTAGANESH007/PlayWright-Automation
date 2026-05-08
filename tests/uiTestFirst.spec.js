import { expect, test } from '@playwright/test'

test("First Browser Context PlayWright Test", async ({ browser }) => {
    const context = await browser.newContext(); // opens a new browser without any information
    const page = await context.newPage(); // creates a page in the new browser window

    await page.goto("https://google.com");

    console.log(await page.title());

    await expect(page).toHaveTitle("Google");
});

test("First Page Context PlayWright Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log(await page.title());

    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("[type='submit']");
    const cardTitle = page.locator(".card-body a");

    await userName.fill("rahulshettyacademy"); // rahulshettyacademy
    await password.fill("Learning@830$3mK2"); // Learning@830$3mK2
    await signInBtn.click();

    // console.log(await page.locator("[style*='block']").textContent())
    // const errorLocator = page.locator("[style*='block']");
    // await expect(errorLocator).toContainText("Incorrect");

    // await page.pause();
    await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop");

    // const firstFound = cardTitle.first(); // nth(index)
    // console.log(await firstFound.textContent());

    // If we don't do the above thing then allTextContents returns an empty array

    // await page.waitForLoadState('networkidle'); // waits till all the network calls are completed
    // await page.pause();

    const allCards = await cardTitle.allTextContents(); // Fetches all the cardtitles
    console.log(allCards)
});


test("UI Controls", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const dropDownBtn = page.locator("select.form-control");
    const checkBox = page.locator("#terms")
    // Change to user
    const selectUser = page.locator(".radiotextsty").last();
    const selectAdmin = page.locator(".radiotextsty").first();

    const blinkingText = page.locator(".blinkingText").first();

    const selectOkay = page.locator("#okayBtn");
    const signInBtn = page.locator("[type='submit']");

    await userName.fill("rahulshettyacademy"); // rahulshettyacademy
    await password.fill("Learning@830$3mK2"); // Learning@830$3mK2
    await dropDownBtn.selectOption("consult");
    await selectUser.click();
    await selectOkay.click();

    //Assertion to check whether the user is selected or not
    // await page.pause();
    await expect(selectUser).toBeChecked();

    // await expect(selectAdmin).not.toBeChecked();
    await checkBox.check();
    await expect(checkBox).toBeChecked();

    await expect(blinkingText).toHaveAttribute("class", "blinkingText");

    await signInBtn.click();
});

test.only("Child Window Handler", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkingText = page.locator(".blinkingText").first();

    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        blinkingText.click(),
    ]);

    const text = await newPage.locator(".im-para.red").textContent();

    const domain = text.split('@')[1].split(' ')[0];

    console.log(domain);

    const userName = page.locator("#username");
    await userName.fill(domain);
    
    await page.pause();

});