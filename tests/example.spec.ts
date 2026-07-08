// tests/example.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test("Enterprise E2E: Verify Checkout Business Math Logic", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Authenticate and select product
  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");
  await inventoryPage.addFirstItemToCart();

  // 2. Navigate through checkout flow
  await checkoutPage.navigateToCheckoutSummary("Robert", "M", "07644");

  // 3. Extract the active price from the UI dynamically
  const webSubtotal = await checkoutPage.getSubtotalPrice();

  // 4. Advanced Logic: Programmatically calculate the 8% standard tax rate yourself
  const expectedTaxCalculated = Math.round(webSubtotal * 0.08 * 100) / 100;

  // 5. Grab the actual tax displayed on the web page to compare
  const webTaxText = await page.locator(".summary_tax_label").textContent();
  const webTaxNumerical = parseFloat(
    webTaxText?.replace(/[^0-9.]/g, "") || "0",
  );

  // 6. High-Value Assertion: Prove the system math matches your calculated logic
  expect(webTaxNumerical).toBe(expectedTaxCalculated);
  console.log(
    `\n -> Success! Web Tax ($${webTaxNumerical}) matches Calculated Tax ($${expectedTaxCalculated})`,
  );
});
