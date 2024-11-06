// utils/login.js
async function login(page, username = 'standard_user', password = 'secret_sauce') {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/');

    // Fill in the username and password fields
    await page.fill('#user-name', username);
    await page.fill('#password', password);

    // Click the login button
    await page.click('.btn_action');

    // Wait for navigation or some element indicating login success
    await page.waitForSelector('.inventory_list', { state: 'visible' });
}

module.exports = { login };
