// tests/pages/contactFormPage.js
exports.ContactFormPage = class ContactFormPage {
    constructor(page) {
        this.page = page;
        // Локаторы полей формы
        this.nameField = page.locator('#name');
        this.emailField = page.locator('#email');
        this.phoneField = page.locator('#phone');
        this.subjectField = page.locator('#subject');
        this.descriptionField = page.locator('#description');
        this.submitButton = page.locator('#submitContact');

        // Пример локаторов для проверки сообщений
        this.successMessage = page.locator('text=Thanks for getting in touch');
        // Или, если есть класс ошибки, можно настроить:
        this.errorMessage = page.locator('.invalid-feedback');
    }

    // Заполнение полей контактной формы
    async fillForm(name, email, phone, subject, description) {
        await this.nameField.fill(name);
        await this.emailField.fill(email);
        await this.phoneField.fill(phone);
        await this.subjectField.fill(subject);
        await this.descriptionField.fill(description);
    }

    // Отправка формы
    async submit() {
        await this.submitButton.click();
    }

    // Проверка успешного сообщения
    async isSuccessMessageVisible() {
        return this.successMessage.isVisible();
    }

    // Проверка ошибки (например, при неправильном email)
    async isErrorMessageVisible() {
        return this.errorMessage.isVisible();
    }
};
