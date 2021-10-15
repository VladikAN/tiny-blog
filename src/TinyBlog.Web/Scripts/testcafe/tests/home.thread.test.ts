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
    const post = await homePage.UpsertPostToDb(title, 'p', 'f', true, ['tag-1']);

    // Assert
    await t.navigateTo(Host);
    const exists = await homePage.IsPostOnPage(post);
    await t.expect(exists).ok();
});

test('Draft post is not displayed on page', async t => {
    // Test
    const title = `Draft post #${new Date().toJSON()}`;
    const post = await homePage.UpsertPostToDb(title, 'p', 'f', false, ['tag-1']);

    // Assert
    await t.navigateTo(Host);
    const exists = await homePage.IsPostOnPage(post);
    await t.expect(exists).notOk();
});

test('Post is displayed with its preview content', async t => {
    // Prepare
    const title = `View post #${new Date().toJSON()}`;
    const post = await homePage.UpsertPostToDb(title, 'preview-text', 'f', true, ['tag-1']);

    // Test
    await t.navigateTo(Host);

    // Assert
    await homePage.isPreviewPostDisplayed(post);
});

test('Click on title will open full text view', async t => {
    // Prepare
    const title = `View post #${new Date().toJSON()}`;
    const post = await homePage.UpsertPostToDb(title, 'p', 'full-text', true, ['tag-1']);

    // Test
    await t.navigateTo(Host);
    await homePage.GoToFullPostView(post);

    // Assert
    await homePage.IsFullPostDisplayed(post);
});