// step_definitions/contact.steps.js
const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ContactFormPage } = require('../pages/ContactFormPage.js');


When('I scroll to the Contact section', async function () {
    await this.page.locator('.contact.row').scrollIntoViewIfNeeded();
});

When('I fill the {string} field with {string}', async function (fieldName, value) {
    if (!this.contactForm) {
        this.contactForm = new ContactFormPage(this.page);
    }
    await this.contactForm.fillField(fieldName, value);
});

When('I click the {string} button on the contact form', async function (buttonName) {
    if (buttonName === 'Submit') {
        await this.contactForm.clickSubmit();
    }
});

Then('I should see a success message {string}', async function (messageText) {
    const actualText = await this.contactForm.getSuccessMessageText();
    expect(actualText).toContain(messageText);
});

Then('I should see an error about invalid email', async function () {
    const isErrorVisible = await this.contactForm.isErrorFeedbackVisible();
    expect(isErrorVisible).toBe(true);
});

Then('the form should not be submitted', async function () {
    const isSuccessVisible = await this.contactForm.isSuccessMessageVisible();
    expect(isSuccessVisible).toBe(false);
});
