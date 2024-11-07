const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login'); // Import the login function

test('Verify sorting Z-A order on All Items page', async ({ page }) => {
    await login(page); // Log in

    // Select Z-A sorting from dropdown
    await page.selectOption('.product_sort_container', 'za');

    // Grab all product names
    const productNames = await page.$$eval('.inventory_item_name', elements =>
        elements.map(el => el.textContent));

    // Verify that the names are sorted Z-A
    const sortedProductNames = [...productNames].sort().reverse(); // Sort names in reverse (Z-A)
    expect(productNames).toEqual(sortedProductNames); // Assert names are sorted correctly
});
