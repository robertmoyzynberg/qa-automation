# Enterprise Cross-Platform E-Commerce Automation Engine

A production-grade test automation framework built with **Playwright** and **TypeScript** utilizing the **Page Object Model (POM)** design pattern. This engine executes parallel, multi-platform verification of e-commerce business logic, transactional integrity, and data calculations across desktop and emulated mobile runtimes.

## 🚀 Core Architecture & Features

- **Page Object Model (POM):** Decoupled structural architecture (`LoginPage`, `InventoryPage`, `CheckoutPage`) separating application layout elements from core behavioral test execution.
- **Algorithmic Business Math Verification:** Programmatically parses raw DOM string data via Regular Expressions, normalizing pricing fields to extract decimals and dynamically calculating standard financial tax rates to assert transactional correctness.
- **Cross-Platform Parallel Execution:** Fully configured infrastructure matrix running simultaneous headless validations across Desktop Chrome, Desktop Firefox, and Mobile Chrome (Pixel 7).
- **Continuous Integration Ready:** Out-of-the-box support for cloud-native orchestration pipelines via GitHub Actions workflows.

## 🛠️ Technology Stack

- **Language:** TypeScript (Strict Type Safety)
- **Framework:** Playwright Test
- **Engine:** Chromium, WebKit, Firefox

## 📈 Local Execution

### Install Dependencies

```bash
npm install
```
