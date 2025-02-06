// step_definitions/homepage.steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage.js');


Given('I open the homepage', async function () {
    this.homePage = new HomePage(this.page);
    await this.homePage.goto();
});

Then('I should see a banner with text {string}', async function (expectedText) {
    const bannerVisible = await this.homePage.isBannerVisible();
    expect(bannerVisible).toBe(true);
});

When(/^I click the "([^"]+)" button on the homepage$/, async function (buttonName) {
    if (buttonName === 'Let me hack!') {
        await this.homePage.clickLetMeHackButton();
    } else if (buttonName === 'Book this room') {
        await this.homePage.clickBookRoom();
    }
});

Then('the banner should disappear', async function () {
    const bannerStillVisible = await this.homePage.isBannerVisible();
    expect(bannerStillVisible).toBe(false);
});

When('I scroll down to the Rooms section', async function () {
        await this.homePage.scrollToRooms();
});

Then('I should see the room type {string}', async function (expectedRoomType) {
    const actualType = await this.homePage.getRoomTypeText();
    expect(actualType).toContain(expectedRoomType);
});

Then('I should see the amenities:', async function (dataTable) {
    // dataTable.asArray() / asList() -> ['TV', 'WiFi', 'Safe']
    const expectedAmenities = dataTable.raw().flat();
    // For example, [["TV"], ["WiFi"], ["Safe"]] -> ["TV", "WiFi", "Safe"]

    const actualAmenities = await this.homePage.getAmenitiesList();
    expect(actualAmenities).toEqual(expectedAmenities);
});

Then('I should see a button {string}', async function (buttonName) {
    if (buttonName === 'Book this room') {
        await expect(this.homePage.bookRoomButton).toBeVisible();
    }
});

Then('I should see a booking form or modal', async function () {
    const modal = this.page.locator('[placeholder="Firstname"]');
    await expect(modal).toBeVisible();
});
