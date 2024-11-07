import { test, expect, chromium, Page } from '@playwright/test';
import { login } from '../utils/login';

test('visual regression test for All Items page', async ({ page }: { page: Page }) => {
    const browser = await chromium.launch({ headless: false }); // Launch the browser in headful mode for GUI visibility
    await page.setViewportSize({ width: 1280, height: 720 }); // Set viewport size

    await login(page); // Log in

    await page.waitForLoadState('networkidle'); // Wait for page to load and no network requests to be active

    // Capture a screenshot for visual regression
    await expect(page).toHaveScreenshot('playwright_sauce\tests\visual.test.spec.ts-snapshots\playwright-sauce-tests-visual-test-spec-ts-snapshots-landing-chromium-win32-chromium-win32-chromium-win32.png', {
        fullPage: true, // Capture full-page screenshot
        threshold: 0.03, // Allow up to 3% of pixels to differ
    });
});
