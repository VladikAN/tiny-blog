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
    await usersPage.CreateUser(username, email);
    await t.navigateTo(UsersUri);

    // Assert
    const user = await usersPage.GetFromDb(email);
    await t
        .expect(user.username).eql(username)
        .expect(user.email).eql(email)
        .expect(user.isActive).eql(true);
    await usersPage.IsUserOnPage(user);
});