const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login'); // Import the login function

test('add items to cart and validate checkout journey', async ({ page }) => {
    await login(page); // Log in

    // Add items to cart
    await page.locator('.inventory_item:nth-child(1) .btn_inventory').click();
    await page.locator('.inventory_item:nth-child(2) .btn_inventory').click();

    // Go to cart and proceed to checkout
    await page.click('.shopping_cart_badge');
    await page.click('//button[@data-test="checkout"]');

    // Fill in checkout details
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.locator('[data-test="continue"]').click();

    // Verify that total info label is visible
    await expect(page.locator('[data-test="total-info-label"]')).toBeVisible();

    // Verify checkout overview page and price summary
    await page.waitForSelector('//*[@id="header_container"]/div[2]/span');
    const summary = await page.locator('[data-test="total-info-label"]').textContent();
    expect(summary).toBe('Price Total');

    // Complete the checkout and go back to products
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
    await page.locator('[data-test="back-to-products"]').click();
});
