import { Selector } from 'testcafe';
import LoginPage from '../pages/login-page';
import { AdminUri, DefaultPassword } from '../constants';
import DashboardPage from '../pages/dashboard-page';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

fixture('Admin login page')
    .before(async ctx => { await loginPage.BeforeAll(); })
    .after(async ctx => { await loginPage.AfterAll(); })
    .page(AdminUri);

test('Page has login, password and submit controls', async () => {
    // Assert
    await loginPage.IsLoginFormDisplayed();
});

test('Try invalid credentials and click submit. Should stay on page and see error', async t => {
    // Test
    await t
        .typeText(loginPage.inpUsername, 'fake-username')
        .typeText(loginPage.inpPassword, 'fake-password')
        .click(loginPage.btnSubmit);

    // Assert
    await loginPage.IsLoginFormDisplayed();
    await t.expect(Selector('div.toastr.rrt-error').exists).ok();
});

test('User promted to change password if required', async t => {
    // Prepare
    const username = 'login-user-1';
    await loginPage.UpsertUser(username, true);

    // Test
    await t
        .typeText(loginPage.inpUsername, username)
        .typeText(loginPage.inpPassword, DefaultPassword)
        .click(loginPage.btnSubmit);

    // Assert
    await loginPage.IsChangePasswordDisplayed();
});

test('User can login by using new password after completed password change', async t => {
    // Prepare
    const username = 'login-user-2';
    const newPassword = 'NewPassword1';
    await loginPage.UpsertUser(username, true);

    // Test
    await t
        .typeText(loginPage.inpUsername, username)
        .typeText(loginPage.inpPassword, DefaultPassword)
        .click(loginPage.btnSubmit)
        .typeText(loginPage.inpPassword, newPassword)
        .click(loginPage.btnSubmit);

    await t
        .typeText(loginPage.inpUsername, username)
        .typeText(loginPage.inpPassword, newPassword)
        .click(loginPage.btnSubmit);

    // Assert
    await dashboardPage.IsDisplayed();
});

test('User will quit to login screen after click on Logout button', async t => {
    // Prepare
    const username = 'login-user-3';
    await loginPage.UpsertUser(username);

    // Test
    await t
        .typeText(loginPage.inpUsername, username)
        .typeText(loginPage.inpPassword, DefaultPassword)
        .click(loginPage.btnSubmit);

    await t
        .click(dashboardPage.lnkLogout);

    // Assert
    await loginPage.IsLoginFormDisplayed();
});