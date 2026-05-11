import { test, expect } from "@playwright/test";

test("Client App Register", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const clickRegisterButton = page.locator(".text-reset");
  await clickRegisterButton.click();

  const firstName = page.getByText("First Name");
  await firstName.fill("Balayya");
  const lastName = page.getByPlaceholder("Last Name");
  await lastName.fill("Babu");
  const email = page.locator("[type='email']");
  await email.fill("jaibalayya@gmail.com");
  const phNo = page.locator("#userMobile");
  await phNo.fill("9876542189");
  const occupation = page.locator(".custom-select");

  // Register as an engineer
  await occupation.selectOption("Engineer"); // {index: number}
  const gender = page.getByRole("radio", { name: "Male", exact: true });
  // await page.locator('input[value="Male"]').check();
  await gender.check();

  const password = page.getByRole("textbox", {
    name: "Passsword",
    exact: true,
  });
  const confirmPassword = page.getByRole("textbox", {
    name: "Confirm Password",
    exact: true,
  });

  await password.fill("J@ibalayy1"); // 1 Special Character, 1 Capital, 1 Numeric, 1 Small
  await confirmPassword.fill("J@ibalayy1");

  expect(await password.inputValue()).toBe(await confirmPassword.inputValue());
  const checkBox = page.locator("[type='checkbox']");
  checkBox.check();

  //   await page.pause();
  await page.locator("[type='submit']").click();
  //   await page.pause();
});

test.only("Client App Login", async ({ page }) => {
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
