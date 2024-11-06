const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default; // 1

test.describe('homepage', () => { // 2
    test('should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/'); // 3

        await page.locator('#login-button').waitFor();

        const accessibility_for_cutom_part = await new AxeBuilder({ page })
            .include('#login-button')
            .analyze();
        expect(accessibility_for_cutom_part.violations).toEqual([]);


        const accessibilityScanResults_withtag = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(accessibilityScanResults_withtag.violations).toEqual([]);


    });
});