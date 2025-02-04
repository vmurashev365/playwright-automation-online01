// tests/sequentialCrossBrowserTest.js
const { chromium, firefox, webkit } = require('playwright');
const { HomePage } = require('../pages/homePage.js');

(async () => {
    // Define the browsers to test sequentially.
    const browsersToTest = [
        { name: 'Chromium', instance: chromium },
        { name: 'Firefox', instance: firefox },
        { name: 'WebKit', instance: webkit }
    ];

    for (const browserType of browsersToTest) {
        console.log(`\nLaunching ${browserType.name}...`);

        // Launch the browser (headless mode for faster execution)
        const browser = await browserType.instance.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();

        // Instantiate the page object and navigate to the main page
        const homePage = new HomePage(page);
        await homePage.goto();

        // Verify key elements on the main page
        try {
            await homePage.verifyKeyElements();
            console.log(`${browserType.name}: All key elements are visible.`);
        } catch (error) {
            console.error(`${browserType.name}: One or more key elements are not visible!`);
            console.error(error);
        }

        // Close the browser before moving to the next
        await browser.close();
        console.log(`${browserType.name} test completed.`);
    }

    console.log('\nSequential cross-browser testing completed.');
})();
