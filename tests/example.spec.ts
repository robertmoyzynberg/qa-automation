import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CheckoutPage } from "../pages/CheckoutPage";
// Injecting our centralized data matrix
import testData from "../testData.json";

test("Enterprise E2E: Data-Driven Multi-Product Validation Suite", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Dynamic Authentication using JSON dataset mapping
  await loginPage.navigate();
  await loginPage.login(
    testData.users.standard.username,
    testData.users.standard.password,
  );

  // 2. Multi-Product Loop parsing data dynamically from external array
  for (const productName of testData.products) {
    await inventoryPage.addItemToCart(productName);
  }

  await inventoryPage.goToCart();

  // 3. Dynamic Business Math Assertions
  await checkoutPage.proceedToCheckout();
  await checkoutPage.fillCheckoutInformation("Robert", "M", "07032");
  await checkoutPage.finishCheckout();

  const webTax = await checkoutPage.getTaxValue();
  const calculatedTax = await checkoutPage.calculateExpectedTax(8);

  console.log(
    `\n -> Success! Web Tax ($${webTax}) matches Calculated Tax ($${calculatedTax})`,
  );
  expect(webTax).toBe(calculatedTax);
});

test("Security Edge Case: Data-Driven Rejection Protocol", async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Testing the system bounds against a known blacklisted user block from our data matrix
  await loginPage.navigate();
  await loginPage.login(
    testData.users.lockedOut.username,
    testData.users.lockedOut.password,
  );

  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain("Sorry, this user has been locked out.");
  console.log(
    "\n -> Success! System defensive perimeter verified for blacklisted accounts.",
  );
});
