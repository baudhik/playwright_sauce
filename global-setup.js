// global-setup.js

const { chromium } = require('playwright');

module.exports = async () => {
    const browser = await chromium.launch({ headless: true }); // Launch the browser
    global.__BROWSER__ = browser; // Store the browser instance globally
};
