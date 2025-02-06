// pages/MapPage.js
const { expect } = require('@playwright/test');

class MapPage {
    constructor(page) {
        this.page = page;
        this.mapContainer = page.locator('.map div[style*="position: relative"]');
    }

    async isMapVisible() {
 
        try {
            await this.mapContainer.waitFor({ state: 'visible', timeout: 2000 });  // Wait up to 2 seconds
            return true;
        } catch (error) {
            return false;  // If timeout occurs, return false
        }
    }

    async checkConsoleErrors() {
        return true; 
    }

    async zoomMap() {
    }
}

module.exports = { MapPage };
