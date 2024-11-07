const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('homepage', () => {
    test('should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/'); // Navigate to homepage

        await page.locator('#login-button').waitFor(); // Wait for the login button to be available

        // Perform accessibility scan for the login button
        const accessibility_for_cutom_part = await new AxeBuilder({ page })
            .include('#login-button')
            .analyze();
        expect(accessibility_for_cutom_part.violations).toEqual([]); // Ensure no accessibility violations

        // Perform accessibility scan with WCAG tags
        const accessibilityScanResults_withtag = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();
        expect(accessibilityScanResults_withtag.violations).toEqual([]); // Ensure no accessibility violations
    });
});
