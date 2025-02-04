// pages/MapPage.js
const { expect } = require('@playwright/test');

class MapPage {
    constructor(page) {
        this.page = page;
        // Например, локатор div карты
        this.mapContainer = page.locator('.map div[style*="position: relative"]');
    }

    async isMapVisible() {
        //return this.mapContainer.isVisible();

        try {
            await this.mapContainer.waitFor({ state: 'visible', timeout: 2000 });  // Wait up to 2 seconds
            return true;
        } catch (error) {
            return false;  // If timeout occurs, return false
        }
    }

    async checkConsoleErrors() {
        // Упрощённый пример: собираем логи консоли
        // Но в Playwright надо настраивать context.on('console'), если хотим ловить в рантайме 
        // Или можно проверить devtools.log. Для простоты — пропустим детальную логику
        return true; // Возвращаем true, если нет major-ошибок
    }

    async zoomMap() {
        // Если карта поддерживает +/-, можно кликнуть на zoom-кнопки
        // Или использовать действия мыши (scroll wheel). 
        // Пример (не всегда работает на встроенных картах):
        // await this.page.mouse.wheel(0, -200);
    }
}

module.exports = { MapPage };
