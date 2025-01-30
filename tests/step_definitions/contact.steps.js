// step_definitions/contact.steps.js
const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ContactFormPage } = require('../pages/ContactFormPage.js');

// Допустим, HomePage уже есть, и в нём есть метод скролла до Contact-секции,
// но для простоты сделаем прямой скролл через this.page.locator(...)

When('I scroll to the {string} section', async function (sectionName) {
    if (sectionName === 'Contact') {
        await this.page.locator('text=Contact').scrollIntoViewIfNeeded();
    }
    // Если будет нужно, можно аналогично делать для других секций
});

When('I fill the {string} field with {string}', async function (fieldName, value) {
    if (!this.contactForm) {
        this.contactForm = new ContactFormPage(this.page);
    }
    await this.contactForm.fillField(fieldName, value);
});

When(/^I click the "([^"]+)" button on the contact form$/, async function (buttonName) {
    if (buttonName === 'Submit') {
        await this.contactForm.clickSubmit();
    }
    // Или свитч, если может быть несколько кнопок
});

Then('I should see a success message {string}', async function (messageText) {
    // Проверяем, что successMessage виден
    const isVisible = await this.contactForm.isSuccessMessageVisible();
    expect(isVisible).toBe(true);
});

Then('I should see an error about invalid email', async function () {
    // Проверяем видимость сообщения об ошибке
    const isErrorVisible = await this.contactForm.isErrorFeedbackVisible();
    expect(isErrorVisible).toBe(true);
});

Then('the form should not be submitted', async function () {
    // Можно проверить, что successMessage не появился:
    const isSuccessVisible = await this.contactForm.isSuccessMessageVisible();
    expect(isSuccessVisible).toBe(false);
});
