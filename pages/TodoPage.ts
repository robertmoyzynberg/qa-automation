// pages/TodoPage.ts
import { Locator, Page } from "@playwright/test";

export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly taskItems: Locator;

  constructor(page: Page) {
    this.page = page;
    // We store our element identifiers inside variables
    this.todoInput = page.getByPlaceholder("What needs to be done?");
    this.taskItems = page.locator("ul.todo-list li");
  }

  // We write reusable action methods
  async loadApp() {
    await this.page.goto("https://demo.playwright.dev/todomvc/");
  }

  async createTodo(taskName: string) {
    await this.todoInput.fill(taskName);
    await this.todoInput.press("Enter");
  }
}
