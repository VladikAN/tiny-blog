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
    const title: string = `Test title #${Date.now()}`;
    await homePage.SetTitle(title);

    // Test
    await t.navigateTo(Host);

    // Assert
    await t.expect(homePage.spnTitle.textContent).eql(title);
});