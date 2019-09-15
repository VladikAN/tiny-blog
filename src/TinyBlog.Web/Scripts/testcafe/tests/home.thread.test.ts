import { Host } from '../constants';
import HomePage from '../pages/home-page';

const homePage = new HomePage();

fixture('Home page. Posts thread')
    .before(async () => { await homePage.BeforeAll(); })
    .after(async () => { await homePage.AfterAll(); })
    .page(Host);

test('Newly created post is displayed on page', async t => {
    // Test
    const title = `New post #${new Date().toJSON()}`;
    const post = await homePage.UpsertPost(title, 'p', 'f', true, ['tag-1']);

    // Assert
    await t.navigateTo(Host);
    await homePage.IsPostOnPage(post);
});