const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login'); // Import the login function
test('Verify sorting Z-A order on All Items page', async ({ page }) => {
    // Select the sorting dropdown

    await login(page);

    await page.selectOption('.product_sort_container', 'za');

    // Grab all the product names
    const productNames = await page.$$eval('.inventory_item_name', elements =>
        elements.map(el => el.textContent));

    // Verify that the names are sorted Z-A
    const sortedProductNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedProductNames);
});

