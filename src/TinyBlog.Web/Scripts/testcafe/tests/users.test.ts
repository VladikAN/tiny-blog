import LoginPage from '../pages/login-page';
import { UsersUri, EmailDomain } from '../constants';
import UsersPage from '../pages/users-page';

const loginPage = new LoginPage();
const usersPage = new UsersPage();

fixture('Admin users page')
    .before(async () => { await usersPage.BeforeAll(); })
    .after(async () => { await usersPage.AfterAll(); })
    .beforeEach(async() => { await loginPage.LoginAsDefault(); })
    .page(UsersUri);

test('Page has controls and table with users', async () => {
    // Assert
    await usersPage.IsPageDisplayed();
});

test('User created as active by default, saved to database and persist after page refresh', async t => {
    // Test
    const username = 'create-admin';
    const email = `${username}@${EmailDomain}`;

    await t.click(usersPage.btnAddUser);
    await usersPage.UpdateUserFromUi(username, email, true);
    await t.navigateTo(UsersUri);

    // Assert
    await t.wait(200); // wait until save is completed
    const user = await usersPage.GetFromDb(email);
    await t
        .expect(user.username).eql(username)
        .expect(user.email).eql(email)
        .expect(user.isActive).eql(true);
    await usersPage.IsUserOnPage(user);
});

test('User can be activated by button click', async t => {
    // Preparation
    const user = await usersPage.UpsertUserToDb('activate-user', false);
    await t.navigateTo(UsersUri);

    // Test
    await usersPage.ToggleActivity(user.email, true);

    // Assert
    await t.wait(200); // wait until save is completed
    const updated = await usersPage.GetFromDb(user.email);
    await t.expect(updated.isActive).eql(true);
});

test('User can be deactivated by button click', async t => {
    // Preparation
    const user = await usersPage.UpsertUserToDb('deactivate-user', true);
    await t.navigateTo(UsersUri);

    // Test
    await usersPage.ToggleActivity(user.email, false);

    // Assert
    await t.wait(200); // wait until save is completed
    const updated = await usersPage.GetFromDb(user.email);
    await t.expect(updated.isActive).eql(false);
});

test('User can be deleted by button click', async t => {
    // Preparation
    const user = await usersPage.UpsertUserToDb('delete-user');
    await t.navigateTo(UsersUri);

    // Test
    await usersPage.DeleteFromUi(user.email);

    // Assert
    await t.wait(200); // wait until save is completed
    const deleted = await usersPage.GetFromDb(user.email);
    await t.expect(deleted).eql(null);
});

test('User can be edited by button click', async t => {
    // Preparation
    const user = await usersPage.UpsertUserToDb('edit-user');
    const expectedEmail = `edited-email@${EmailDomain}`;

    await t.navigateTo(UsersUri);

    // Test
    await usersPage.StartEditFromUi(user.email);
    await usersPage.UpdateUserFromUi(user.username, expectedEmail, false);

    // Assert
    await t.wait(200); // wait until save is completed
    const updated = await usersPage.GetFromDb(expectedEmail);
    await t
        .expect(updated.username).eql(user.username)
        .expect(updated.email).eql(expectedEmail);
});