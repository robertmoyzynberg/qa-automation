// pages/InventoryPage.ts
import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly firstProductAddButton: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    // Targeting the first item's 'Add to cart' button dynamically
    this.firstProductAddButton = page.locator(".inventory_item button").first();
    this.shoppingCartBadge = page.locator(".shopping_cart_badge");
  }

  async addFirstItemToCart() {
    await this.firstProductAddButton.click();
  }
}
