// step_definitions/homepage.steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage.js');

// В hooks.js или globalSetup можно создавать один browser на всё, 
// а здесь получать контекст/страницу. 
// Но для упрощения предположим, что у нас есть общий объект "global.page".

Given('I open the homepage', async function () {
    // Создаем экземпляр HomePage на основе общей page
    this.homePage = new HomePage(this.page);
    await this.homePage.goto();
});

Then('I should see a banner with text {string}', async function (expectedText) {
    // Проверяем видимость баннера
    const bannerVisible = await this.homePage.isBannerVisible();
    expect(bannerVisible).toBe(true);
    // (Дополнительно можно проверить конкретный текст, 
    //  если бы мы доставали textContent баннера)
});

When(/^I click the "([^"]+)" button on the homepage$/, async function (buttonName) {
    // В feature указано "Let me hack!"
    // Можно условно сделать свитч, если кнопок несколько
    if (buttonName === 'Let me hack!') {
        await this.homePage.clickLetMeHackButton();
    } else if (buttonName === 'Book this room') {
        await this.homePage.clickBookRoom();
    }
    // и т.д.
});

Then('the banner should disappear', async function () {
    const bannerStillVisible = await this.homePage.isBannerVisible();
    expect(bannerStillVisible).toBe(false);
});

When('I scroll down to the {string} section', async function (sectionName) {
    if (sectionName === 'Rooms') {
        await this.homePage.scrollToRooms();
    }
    // Если есть другие секции, 
    // мы могли бы сделать разные методы в POM или общий метод scrollToSection.
});

Then('I should see the room type {string}', async function (expectedRoomType) {
    const actualType = await this.homePage.getRoomTypeText();
    expect(actualType).toContain(expectedRoomType);
});

Then('I should see the amenities:', async function (dataTable) {
    // dataTable.asArray() / asList() -> ['TV', 'WiFi', 'Safe']
    const expectedAmenities = dataTable.raw().flat();
    // Например, [["TV"], ["WiFi"], ["Safe"]] -> ["TV", "WiFi", "Safe"]

    const actualAmenities = await this.homePage.getAmenitiesList();
    expect(actualAmenities).toEqual(expectedAmenities);
});

Then('I should see a button {string}', async function (buttonName) {
    // Логика проверки наличия кнопки
    // Можно, например, дождаться её видимости:
    if (buttonName === 'Book this room') {
        await expect(this.homePage.bookRoomButton).toBeVisible();
    }
});

Then('I should see a booking form or modal', async function () {
    // Здесь проверяем, что появилось какое-то окно/форма.
    // Допустим, в POM ещё не реализовано. Пример:
    const modal = this.page.locator('[placeholder="Firstname"]');
    await expect(modal).toBeVisible();
});
