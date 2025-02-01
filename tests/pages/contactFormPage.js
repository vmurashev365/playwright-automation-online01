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
        this.successMessage = page.locator('.contact.row h2');
        // Или, если есть класс ошибки, можно настроить:
        this.errorMessage = page.locator('.alert-danger');
    }

    // Заполнение полей контактной формы
    async fillField(fieldName, value) {
        switch (fieldName) {
            case 'Name':
                await this.nameField.fill(value);
                break;
            case 'Email':
                await this.emailField.fill(value);
                break;
            case 'Phone':
                await this.phoneField.fill(value);
                break;
            case 'Subject':
                await this.subjectField.fill(value);
                break;
            case 'Message':
                await this.descriptionField.fill(value);
                break;
            default:
                throw new Error(`Unknown field name: ${fieldName}`);
        }
    }

    // Отправка формы
    async clickSubmit() {
        await this.submitButton.click();
    }

    // Проверка успешного сообщения
    async getSuccessMessageText() {
        return await this.successMessage.textContent();
    }

    async isSuccessMessageVisible() {
        try {
            await this.successMessage.waitFor({ state: 'visible', timeout: 2000 });  // Wait up to 2 seconds
            return true;
        } catch (error) {
            return false;  // If timeout occurs, return false
        }
    }

    // Проверка ошибки (например, при неправильном email)
    async isErrorFeedbackVisible() {
        try {
            await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });  // Wait up to 5 seconds
            return true;
        } catch (error) {
            return false;  // If timeout occurs, return false
        }
    }

};

