import { Host } from '../constants';
import HomePage from '../pages/home-page';

const homePage = new HomePage();

fixture('Home page')
    .before(async () => { await homePage.BeforeAll(); })
    .after(async () => { await homePage.AfterAll(); })
    .page(Host);

test('Page has header, footer and thread block', async () => {
    // Assert
    await homePage.IsLoginFormDisplayed();
});

test('Page title reflects to value from database', async t => {
    // Prepare
    const title = `Test title #${Date.now()}`;
    await homePage.SetTitle(title);

    // Test
    await t.navigateTo(Host);

    // Assert
    await t.expect(homePage.spnTitle.textContent).eql(title);
});

test('Empty header content set for home page and it\'s not displayed', async t => {
    // Prepare
    const headerMd = '';
    await homePage.SetHeaderContent(headerMd);

    // Test
    await t.navigateTo(Host);

    // Assert
    await t.expect(homePage.spnHeader.exists).eql(false);
});

test('Header content set for home page and it\'s displayed', async t => {
    // Prepare
    const headerMd = `Header content #${Date.now()}`;
    await homePage.SetHeaderContent(headerMd);

    // Test
    await t.navigateTo(Host);

    // Assert
    await t
        .expect(homePage.spnHeader.exists).eql(true)
        .expect(homePage.spnHeader.innerText).eql(headerMd);
});

test('Empty footer content set for home page and it\'s not displayed', async t => {
    // Prepare
    const footerMd = '';
    await homePage.SetFooterContent(footerMd);

    // Test
    await t.navigateTo(Host);

    // Assert
    await t.expect(homePage.spnFooter.exists).eql(false);
});

test('Footer content set for home page and it\'s displayed', async t => {
    // Prepare
    const headerMd = `Footer content #${Date.now()}`;
    await homePage.SetFooterContent(headerMd);

    // Test
    await t.navigateTo(Host);

    // Assert
    await t
        .expect(homePage.spnFooter.exists).eql(true)
        .expect(homePage.spnFooter.innerText).eql(headerMd);
});