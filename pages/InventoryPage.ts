// pages/InventoryPage.ts
import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly firstProductAddButton: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Targeting the first item's 'Add to cart' button dynamically
    this.firstProductAddButton = page.locator(".inventory_item button").first();
    this.shoppingCartBadge = page.locator(".shopping_cart_badge");
    this.shoppingCartLink = page.locator(".shopping_cart_link");
  }

  async addFirstItemToCart() {
    await this.firstProductAddButton.click();
  }

  async addItemToCart(productName: string) {
    const productItem = this.page
      .locator(".inventory_item")
      .filter({ has: this.page.getByText(productName, { exact: true }) });
    await productItem.locator("button").click();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }
}
