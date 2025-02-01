// pages/homePage.js
const { expect } = require('@playwright/test');

class HomePage {
    constructor(page) {
        this.page = page;
        // Локаторы
        this.banner = page.locator('.jumbotron');
        this.letMeHackButton = page.locator('button', { hasText: 'Let me hack!' });

        this.roomsHeader = page.locator('h2', { hasText: 'Rooms' });
        this.roomType = page.locator('h3', { hasText: 'Single' });
        this.roomAmenities = page.locator('.col-sm-7 ul li');
        this.bookRoomButton = page.locator('button', { hasText: 'Book this room' });
    }

    async goto() {
        await this.page.goto('https://automationintesting.online/');
    }

    async isBannerVisible() {
        return this.banner.isVisible();
    }

    async clickLetMeHackButton() {
        await this.letMeHackButton.click();
    }

    async scrollToRooms() {
        await this.roomsHeader.scrollIntoViewIfNeeded();
    }

    async getRoomTypeText() {
        return await this.roomType.textContent();
    }

    async getAmenitiesList() {
        return await this.roomAmenities.allTextContents();
        // ["TV", "WiFi", "Safe"]
    }

    async clickBookRoom() {
        await this.bookRoomButton.click();
    }
}

module.exports = { HomePage };
