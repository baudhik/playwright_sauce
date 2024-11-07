const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login'); // Import the login function

test('verify price order high-low on All Items page', async ({ page }) => {
  await login(page); // Log in

  // Select high-to-low price sorting from dropdown
  await page.selectOption('select[data-test="product-sort-container"]', 'hilo');

  // Wait for items to load and verify price order
  const prices = await page.locator('.inventory_item_price').allTextContents();
  const numericPrices = prices.map(price => parseFloat(price.replace('$', ''))); // Convert price to float
  const sortedPrices = [...numericPrices].sort((a, b) => b - a); // Sort prices from high to low
  expect(numericPrices).toEqual(sortedPrices); // Assert prices are sorted correctly
});
