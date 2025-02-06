// step_definitions/hooks.js
const { BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

AfterAll(async function () {
    await browser.close();
});

Before(async function () {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

After(async function () {
    await this.page.close();
    await this.context.close();
});
