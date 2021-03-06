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
    await loginPage.IsPageDisplayed();
});

test('Try invalid credentials and click submit. Should stay on page and see error', async t => {
    // Test
    await loginPage.Login('fake-username', 'fake-password');

    // Assert
    await loginPage.IsPageDisplayed();
    await t.expect(Selector('div.toastr.rrt-error').exists).ok();
});

test('User promted to change password', async () => {
    // Prepare
    const username = 'login-user-1';
    await loginPage.UpsertUserToDB(username, true);

    // Test
    await loginPage.Login(username, DefaultPassword);

    // Assert
    await loginPage.IsChangePasswordDisplayed();
});

test('User can\'t enter if typed invalid password to confirm', async t => {
    // Prepare
    const username = 'login-user-2';
    await loginPage.UpsertUserToDB(username, true);

    // Test
    await loginPage.Login(username, DefaultPassword);
    await t
        .typeText(loginPage.inpPassword, 'one-password')
        .typeText(loginPage.inpConfirmPassword, 'another-password')
        .click(loginPage.btnSubmit);

    // Assert
    await loginPage.IsChangePasswordDisplayed();
    await t.expect(Selector('div.toastr.rrt-error').exists).ok();
});

test('User can login by using new password after completed password change', async t => {
    // Prepare
    const username = 'login-user-3';
    const newPassword = 'NewPassword1';
    await loginPage.UpsertUserToDB(username, true);

    // Test
    await loginPage.Login(username, DefaultPassword);
    await t
        .typeText(loginPage.inpPassword, newPassword)
        .typeText(loginPage.inpConfirmPassword, newPassword)
        .click(loginPage.btnSubmit);

    await loginPage.Login(username, newPassword);

    // Assert
    await dashboardPage.IsDisplayed();
});

test('User can login by using known credentials', async () => {
    // Prepare
    const username = 'login-user-4';
    await loginPage.UpsertUserToDB(username);

    // Test
    await loginPage.Login(username, DefaultPassword);

    // Assert
    await dashboardPage.IsDisplayed();
});

test('User cannot login by using known credentials because user is inactive', async t => {
    // Prepare
    const username = 'login-user-5';
    await loginPage.UpsertUserToDB(username, false, false);

    // Test
    await loginPage.Login(username, DefaultPassword);

    // Assert
    await loginPage.IsPageDisplayed();
    await t.expect(Selector('div.toastr.rrt-error').exists).ok();
});

test('User will quit to login screen after click on Logout button', async t => {
    // Prepare
    const username = 'login-user-6';
    await loginPage.UpsertUserToDB(username);

    // Test
    await loginPage.Login(username, DefaultPassword);

    await t
        .click(dashboardPage.lnkLogout);

    // Assert
    await loginPage.IsPageDisplayed();
});