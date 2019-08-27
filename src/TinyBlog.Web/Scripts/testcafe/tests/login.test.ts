import { Selector } from 'testcafe';
import LoginPage from '../pages/login-page';
import { AdminUri, DefaultPassword } from '../constants';
import DashboardPage from '../pages/dashboard-page';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

fixture('Admin login page')
    .before(async () => { await loginPage.BeforeAll(); })
    .after(async () => { await loginPage.AfterAll(); })
    .page(AdminUri);

test('Page has login, password and submit controls', async () => {
    // Assert
    await loginPage.IsLoginFormDisplayed();
});

test('Try invalid credentials and click submit. Should stay on page and see error', async t => {
    // Test
    await loginPage.Login('fake-username', 'fake-password');

    // Assert
    await loginPage.IsLoginFormDisplayed();
    await t.expect(Selector('div.toastr.rrt-error').exists).ok();
});

test('User promted to change password if required', async () => {
    // Prepare
    const username = 'login-user-1';
    await loginPage.UpsertUser(username, true);

    // Test
    await loginPage.Login(username, DefaultPassword);

    // Assert
    await loginPage.IsChangePasswordDisplayed();
});

test('User can login by using new password after completed password change', async t => {
    // Prepare
    const username = 'login-user-2';
    const newPassword = 'NewPassword1';
    await loginPage.UpsertUser(username, true);

    // Test
    await loginPage.Login(username, DefaultPassword);
    await t
        .typeText(loginPage.inpPassword, newPassword)
        .click(loginPage.btnSubmit);

    await loginPage.Login(username, newPassword);

    // Assert
    await dashboardPage.IsDisplayed();
});

test('User can login by using known credentials', async () => {
    // Prepare
    const username = 'login-user-3';
    await loginPage.UpsertUser(username);

    // Test
    await loginPage.Login(username, DefaultPassword);

    // Assert
    await dashboardPage.IsDisplayed();
});

test('User cannot login by using known credentials because user is inactive', async t => {
    // Prepare
    const username = 'login-user-4';
    await loginPage.UpsertUser(username, false, false);

    // Test
    await loginPage.Login(username, DefaultPassword);

    // Assert
    await loginPage.IsLoginFormDisplayed();
    await t.expect(Selector('div.toastr.rrt-error').exists).ok();
});

test('User will quit to login screen after click on Logout button', async t => {
    // Prepare
    const username = 'login-user-5';
    await loginPage.UpsertUser(username);

    // Test
    await loginPage.Login(username, DefaultPassword);

    await t
        .click(dashboardPage.lnkLogout);

    // Assert
    await loginPage.IsLoginFormDisplayed();
});