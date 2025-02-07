// hooks.js or a custom world file
const { Before, After } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');

let browser, context, page;

Before(async function () {
    const browserChoice = process.env.BROWSER || 'chromium';
    if (browserChoice === 'firefox') {
        browser = await firefox.launch({ headless: false });
    } else if (browserChoice === 'webkit') {
        browser = await webkit.launch({ headless: false });
    } else {
        browser = await chromium.launch({ headless: false });
    }
    const context = await browser.newContext();
    const page = await context.newPage();

    // Attach them to the Cucumber World
    this.browser = browser;
    this.context = context;
    this.page = page;
});

After(async function () {
    // Close everything for this scenario
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});
