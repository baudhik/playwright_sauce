const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login'); // Import the login function


test.describe('SauceDemo Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Go to the login page
        await login(page);

    });



    //Verify the sorting order Z-A on the "All Items" page
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




    // Verify the price sorting High-Low
    test('Verify sorting price High to Low on All Items page', async ({ page }) => {
        // Select the sorting dropdown
        await login(page);

        await page.selectOption('.product_sort_container', 'hilo');

        // Grab all the product prices
        const productPrices = await page.$$eval('.inventory_item_price', elements =>
            elements.map(el => parseFloat(el.textContent.replace('$', ''))));


        // Verify that prices are sorted from high to low
        const sortedPrices = [...productPrices].sort((a, b) => b - a);
        expect(productPrices).toEqual(sortedPrices);
    });


    // Add multiple items to cart and validate checkout journey
    test('Add multiple items and validate checkout', async ({ page }) => {
        // Add first and second items to cart
        await page.click('.inventory_item:nth-child(1) .btn_inventory');
        await page.click('.inventory_item:nth-child(2) .btn_inventory');

        // Click the cart button
        await page.click('.shopping_cart_link');

        // Assert that there are 2 items in the cart
        const cartItemCount = await page.$$eval('.cart_item', items => items.length);
        expect(cartItemCount).toBe(2);

        // Proceed to checkout
        await page.click('#checkout');

        // Fill in checkout information
        await page.fill('#first-name', 'Test');
        await page.fill('#last-name', 'User');
        await page.fill('#postal-code', '12345');

        // Continue to the overview page
        await page.click('#continue');

        // Verify that the total amount matches the sum of items
        const itemPrices = await page.$$eval('.inventory_item_price', items =>
            items.map(item => parseFloat(item.textContent.replace('$', ''))));

        const totalSum = itemPrices.reduce((a, b) => a + b, 0);

        const totalAmount = await page.$eval('.summary_subtotal_label', el =>
            parseFloat(el.textContent.match(/[\d\.]+/)[0]));

        expect(totalAmount).toBe(totalSum);

        // Finish the order
        await page.click('#finish');
        await page.waitForTimeout(3000);

        // Verify that the order is complete
        await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');

    });
}); 