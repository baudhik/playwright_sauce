<<<<<<< HEAD
# Playwright Automation Tests for Saucedemo

This repository contains automated tests for the [SauceDemo](https://www.saucedemo.com/) application using Playwright in JavaScript. The tests cover functionality such as sorting, price order, adding items to the cart, and the checkout flow. Additionally, it includes tests for visual and accessibility validations.

## Scenarios to be Automated

1. **Verify Sorting Order for Z-A** on the “All Items” page.
2. **Verify Price Order (High-Low)** on the “All Items” page.
3. **Add Multiple Items to Cart and Validate Checkout Journey**.

## Overview
   This repository contains an automation suite using Playwright for testing core functionalities on Sauce Demo, including     sorting, cart functionality, visual regression, and accessibility.

## Prerequisites
1. **Node.js** - Version >= 14.x
2. **Playwright** - Run `npm install @playwright/test`
3. **Browser Dependencies** - Run `npx playwright install` to install required browsers

## Setup & Installation
1. Clone this repository.
2. Install dependencies:
   npm install

**Install Playwright browsers:**
   npx playwright install

**Running Tests**
1. To run all tests:
      npx playwright test

2. To run a specific test file:
      npx playwright test tests/sort.test.js

**Headed/Headless Execution**
1. To run tests in headed mode:
      npx playwright test --headed
   
2. For headless mode:
      npx playwright test

**Accessibility**
   Accessibility tests leverage @axe-core/playwright. Accessibility violations will appear in test output.

**Test report** : for reivew automation test report user can wright below command after test automation is complete.
	npx playwright show-report test-results
