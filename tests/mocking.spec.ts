import { test, expect } from "@playwright/test";

test.describe("Senior SDET Pattern: Network Mocking & Fault Injection", () => {
  test("Mocking API Response: Injecting a 500 Internal Server Error", async ({
    page,
  }) => {
    // 1. INTERCEPT: Intercept any request matching Backtrace analytics or backend calls
    await page.route("**/events.backtrace.io/**", async (route) => {
      // 2. MOCK: Instead of letting the request hit the real server, return a fake 500 error
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Simulated System Breakdown" }),
      });
      console.log(
        "⚡ [MOCK INJECTED] Intercepted network call and returned synthetic 500 Server Error",
      );
    });

    // 3. EXECUTE: Navigate to the site
    await page.goto("https://www.saucedemo.com/");

    // 4. VERIFY: The application loaded, but our network interceptor successfully hijacked the endpoint
    console.log(
      "✅ App loaded successfully while background API was mocked to fail.",
    );
  });

  test("Mocking API Payload: Injecting Custom JSON Data", async ({ page }) => {
    // Intercept CSS/Font calls or API calls and return custom payload headers
    await page.route(
      "https://www.saucedemo.com/assets/index-Co7SA-g_.css",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "text/css",
          body: "/* Intercepted and injected custom synthetic CSS stylesheet */",
        });
        console.log(
          "⚡ [MOCK INJECTED] Replaced live CSS asset with synthetic payload",
        );
      },
    );

    await page.goto("https://www.saucedemo.com/");
  });
});
