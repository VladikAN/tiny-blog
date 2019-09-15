import { SettingsUri } from '../constants';
import LoginPage from '../pages/login-page';
import SettingsPage from '../pages/settings-page';

const loginPage = new LoginPage();
const settingsPage = new SettingsPage();

fixture('Admin settings page')
    .before(async () => { await settingsPage.BeforeAll(); })
    .after(async () => { await settingsPage.AfterAll(); })
    .beforeEach(async() => { await loginPage.LoginAsDefault(); })
    .page(SettingsUri);

test('Page has login, password and submit controls', async () => {
    // Assert
    await settingsPage.IsPageDisplayed();
});

test('Title changes reflects database record and stays on page after refresh', async t => {
    // Test
    const expectedValue = `Title #${Date.now()}`;
    await t
        .typeText(settingsPage.inpTitle, expectedValue, { replace: true })
        .click(settingsPage.btnSave)
        .navigateTo(SettingsUri);

    // Assert
    const record = await settingsPage.GetSettingsFromDb();
    await t
        .expect(settingsPage.inpTitle.value).eql(expectedValue)
        .expect(record.title).eql(expectedValue);
});

test('Description changes reflects database record and stays on page after refresh', async t => {
    // Test
    const expectedValue = `Description #${Date.now()}`;
    await t
        .typeText(settingsPage.inpDescription, expectedValue, { replace: true })
        .click(settingsPage.btnSave)
        .navigateTo(SettingsUri);

    // Assert
    const record = await settingsPage.GetSettingsFromDb();
    await t
        .expect(settingsPage.inpDescription.value).eql(expectedValue)
        .expect(record.description).eql(expectedValue);
});

test('Uri changes reflects database record and stays on page after refresh', async t => {
    // Test
    const expectedValue = `Uri #${Date.now()}`;
    await t
        .typeText(settingsPage.inpUri, expectedValue, { replace: true })
        .click(settingsPage.btnSave)
        .navigateTo(SettingsUri);

    // Assert
    const record = await settingsPage.GetSettingsFromDb();
    await t
        .expect(settingsPage.inpUri.value).eql(expectedValue)
        .expect(record.uri).eql(expectedValue);
});

test('Author changes reflects database record and stays on page after refresh', async t => {
    // Test
    const expectedValue = `Author #${Date.now()}`;
    await t
        .typeText(settingsPage.inpAuthor, expectedValue, { replace: true })
        .click(settingsPage.btnSave)
        .navigateTo(SettingsUri);

    // Assert
    const record = await settingsPage.GetSettingsFromDb();
    await t
        .expect(settingsPage.inpAuthor.value).eql(expectedValue)
        .expect(record.author).eql(expectedValue);
});

test('Language changes reflects database record and stays on page after refresh', async t => {
    // Test
    const expectedValue = `Language #${Date.now()}`;
    await t
        .typeText(settingsPage.inpLanguage, expectedValue, { replace: true })
        .click(settingsPage.btnSave)
        .navigateTo(SettingsUri);

    // Assert
    const record = await settingsPage.GetSettingsFromDb();
    await t
        .expect(settingsPage.inpLanguage.value).eql(expectedValue)
        .expect(record.language).eql(expectedValue);
});

test('Google Tags Code changes reflects database record and stays on page after refresh', async t => {
    // Test
    const expectedValue = `Google Tags Code #${Date.now()}`;
    await t
        .typeText(settingsPage.inpGoogleTagsCode, expectedValue, { replace: true })
        .click(settingsPage.btnSave)
        .navigateTo(SettingsUri);

    // Assert
    const record = await settingsPage.GetSettingsFromDb();
    await t
        .expect(settingsPage.inpGoogleTagsCode.value).eql(expectedValue)
        .expect(record.googleTagsCode).eql(expectedValue);
});

test('Header changes reflects database record and stays on page after refresh', async t => {
    // Test
    const expectedValue = `Header #${Date.now()}`;
    await t
        .typeText(settingsPage.inpHeader, expectedValue, { replace: true })
        .click(settingsPage.btnSave)
        .navigateTo(SettingsUri);

    // Assert
    const record = await settingsPage.GetSettingsFromDb();
    await t
        .expect(settingsPage.inpHeader.value).eql(expectedValue)
        .expect(record.headerContent).eql(expectedValue);
});

test('Footer changes reflects database record and stays on page after refresh', async t => {
    // Test
    const expectedValue = `Footer #${Date.now()}`;
    await t
        .typeText(settingsPage.inpFooter, expectedValue, { replace: true })
        .click(settingsPage.btnSave)
        .navigateTo(SettingsUri);

    // Assert
    const record = await settingsPage.GetSettingsFromDb();
    await t
        .expect(settingsPage.inpFooter.value).eql(expectedValue)
        .expect(record.footerContent).eql(expectedValue);
});

test('Header MD changes reflects on preview window', async t => {
    // Test
    const markdown = '[link](domain.com) **header**';
    await t
        .typeText(settingsPage.inpHeader, markdown, { replace: true })
        .click(settingsPage.btnSave)
        .navigateTo(SettingsUri);

    // Assert
    await t
        .expect(settingsPage.prwHeader.find('a').exists).eql(true)
        .expect(settingsPage.prwHeader.find('strong').exists).eql(true)
        .expect(settingsPage.prwHeader.find('strong').innerText).eql('header');
});

test('Footer MD changes reflects on preview window', async t => {
    // Test
    const markdown = '[link](domain.com) **footer**';
    await t
        .typeText(settingsPage.inpFooter, markdown, { replace: true })
        .click(settingsPage.btnSave)
        .navigateTo(SettingsUri);

    // Assert
    await t
        .expect(settingsPage.prwFooter.find('a').exists).eql(true)
        .expect(settingsPage.prwFooter.find('strong').exists).eql(true)
        .expect(settingsPage.prwFooter.find('strong').innerText).eql('footer');
});