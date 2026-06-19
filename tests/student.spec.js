const { test, expect } = require('@playwright/test');
const StudentPage = require('../pages/StudentPage');

test('Add Student', async ({ page }) => {

    const studentPage = new StudentPage(page);

    await studentPage.navigate();

    await studentPage.addStudent(
        'POM Student',
        'pom@test.com',
        'Playwright'
    );

    await expect(page.locator('#studentTable'))
        .toContainText('POM Student');
});


test('Search Student', async ({ page }) => {

    const studentPage = new StudentPage(page);

    await studentPage.navigate();

    // Create student first
    await studentPage.addStudent(
        'Playwright Test',
        'playwright@test.com',
        'Automation'
    );

    // Search
    await page.fill('#searchInput', 'Playwright Test');

    // Validate
    await expect(page.locator('#studentTable'))
        .toContainText('Playwright Test');
});


test('Delete Student', async ({ page }) => {

    const studentPage = new StudentPage(page);

    await studentPage.navigate();

    await studentPage.addStudent(
        'Delete Me',
        `delete${Date.now()}@test.com`,
        'Test'
    );

    page.on('dialog', dialog => dialog.accept());

    await page.getByRole('button', { name: 'Delete' })
        .last()
        .click();

});

test('Edit Student', async ({ page }) => {

    const studentPage = new StudentPage(page);

    await studentPage.navigate();

    await studentPage.addStudent(
        'Old Student',
        `old${Date.now()}@test.com`,
        'Playwright'
    );

    await page.getByRole('button', { name: 'Edit' })
        .last()
        .click();

    await page.fill('#name', 'Updated Student');

    await page.click('button[type="submit"]');

    await expect(page.locator('#studentTable'))
        .toContainText('Updated Student');

});