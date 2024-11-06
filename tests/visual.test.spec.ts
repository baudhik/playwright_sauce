import { test, expect, chromium, Page } from '@playwright/test';
import { login } from '../utils/login';

test('visual regression test for All Items page', async ({ page }: { page: Page }) => {
    // Launch the browser in headful mode for GUI visibility
    const browser = await chromium.launch({ headless: false }); // Removed `playwright` and directly imported `chromium`

    // Use the `page` provided by Playwright, no need to create a new page object
    await page.setViewportSize({ width: 1280, height: 720 });

    // Log in using a utility function
    await login(page);

    // Wait for the page to load and no network requests to be active
    await page.waitForLoadState('networkidle');

    // Capture a screenshot for visual regression
    // Fixed file path to use forward slashes for cross-platform compatibility
    await expect(page).toHaveScreenshot('landing-chromium-win32.png', { fullPage: true });

    // Close the browser after the test
    await browser.close();
});
