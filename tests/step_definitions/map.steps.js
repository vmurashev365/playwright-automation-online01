// step_definitions/map.steps.js
const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { MapPage } = require('../pages/MapPage');

When('I scroll down to the Map section', async function () {
        // Скроллим к блоку, где карта
        await this.page.locator('.map').scrollIntoViewIfNeeded();
});

Then('the map should be visible', async function () {
    if (!this.mapPage) {
        this.mapPage = new MapPage(this.page);
    }
    const isVisible = await this.mapPage.isMapVisible();
    expect(isVisible).toBe(true);
});

Then('there should be no major console errors', async function () {
    const noErrors = await this.mapPage.checkConsoleErrors();
    expect(noErrors).toBe(true);
});

When('I zoom the map', async function () {
    if (!this.mapPage) {
        this.mapPage = new MapPage(this.page);
    }
    await this.mapPage.zoomMap();
});

Then('the map should respond without crashing', async function () {
    // Минимальная проверка: не упал браузер, не появилось фатальных ошибок
    // Можно ещё раз проверить console errors
    const noErrors = await this.mapPage.checkConsoleErrors();
    expect(noErrors).toBe(true);
});
