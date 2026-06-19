class StudentPage {

    constructor(page) {
        this.page = page;

        this.nameInput = '#name';
        this.emailInput = '#email';
        this.courseInput = '#course';
        this.submitButton = 'button[type="submit"]';
    }

    async navigate() {
        await this.page.goto('http://localhost:3000');
    }

    async addStudent(name, email, course) {

        await this.page.fill(this.nameInput, name);

        await this.page.fill(this.emailInput, email);

        await this.page.fill(this.courseInput, course);

        await this.page.click(this.submitButton);
    }

    async searchStudent(name) {
        await this.page.fill('#searchInput', name);
    }

}

module.exports = StudentPage;