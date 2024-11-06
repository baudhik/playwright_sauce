const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login'); // Import the login function

test('verify price order high-low on All Items page', async ({ page }) => {
  await login(page);


  const sortDropdown = await page.locator('.product_sort_container');
  await page.selectOption('select[data-test="product-sort-container"]', 'hilo');

  // Wait for items to load and verify price order
  const prices = await page.locator('.inventory_item_price').allTextContents();
  const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
  const sortedPrices = [...numericPrices].sort((a, b) => b - a);
  expect(numericPrices).toEqual(sortedPrices);
});
