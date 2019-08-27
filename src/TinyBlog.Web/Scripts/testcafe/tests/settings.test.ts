import { SettingsUri } from '../constants';
import LoginPage from '../pages/login-page';
import SettingsPage from '../pages/settings-page';

const loginPage = new LoginPage();
const settingsPage = new SettingsPage();

fixture('Settings page')
    .before(async () => { await settingsPage.BeforeAll(); })
    .after(async () => { await settingsPage.AfterAll(); })
    .beforeEach(async() => { await loginPage.LoginAsDefault(); })
    .page(SettingsUri);

test('Page has login, password and submit controls', async () => {
    // Assert
    await settingsPage.IsSettingsPageDisplayed();
});