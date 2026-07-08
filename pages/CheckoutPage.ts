// pages/CheckoutPage.ts
import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly subtotalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator(".shopping_cart_link");
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.subtotalLabel = page.locator(".summary_subtotal_label");
  }

  async navigateToCheckoutSummary(first: string, last: string, zip: string) {
    await this.cartButton.click();
    await this.checkoutButton.click();
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.postalCodeInput.fill(zip);
    await this.continueButton.click();
  }

  async getSubtotalPrice(): Promise<number> {
    // Scrape the raw text string (e.g., "Item total: $29.99") from the screen
    const rawText = await this.subtotalLabel.textContent();
    if (!rawText) throw new Error("Could not find subtotal text");

    // Clean the string down to just a raw decimal number using regex
    const numericString = rawText.replace(/[^0-9.]/g, "");
    return parseFloat(numericString);
  }
}
