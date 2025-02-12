// hooks.js
const { Before, After } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');

let browser, context, page;

Before(async function () {
    const browserChoice = process.env.BROWSER || 'chromium';

    if (browserChoice === 'firefox') {
        browser = await firefox.launch({
            headless: false,
            args: ['--kiosk']
        });
    } else if (browserChoice === 'webkit') {
        browser = await webkit.launch({
            headless: false
        });
    } else {
        browser = await chromium.launch({
            headless: false,
            args: ['--start-maximized']
        });
    }

    context = await browser.newContext({
        viewport: null
    });

    page = await context.newPage();

    this.browser = browser;
    this.context = context;
    this.page = page;
});

After(async function () {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});
