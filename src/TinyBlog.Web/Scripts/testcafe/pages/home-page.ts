import { Selector, t } from 'testcafe';
import LayoutService from '../services/layout-service';
import { LayoutDomain } from '../types/layout';
import PostService from '../services/post-service';
import { PostDomain } from '../types/post';

export default class HomePage {
    public blkHeader: Selector;
    public spnTitle: Selector;

    public blkContent: Selector;
    public spnHeader: Selector;
    public blkThread: Selector;

    public blkFooter: Selector;
    public spnFooter: Selector;

    private layoutService: LayoutService;
    private postService: PostService;
    private initialLayout: LayoutDomain;

    private headerSelector: string = 'h2';
    private markdownSelector: string = 'div.markdown';
    private tagsSelector: string = '.tags a';

    public constructor() {
        this.blkHeader = Selector('div.header');
        this.spnTitle = this.blkHeader.find('a.header__body_link');

        this.blkContent = Selector('div.content');
        this.spnHeader = this.blkContent.find('div.content__header');
        this.blkThread = this.blkContent.find('div.thread div.thread__post');

        this.blkFooter = Selector('div.footer');
        this.spnFooter = this.blkFooter.find('div.footer__body');

        this.layoutService = new LayoutService();
        this.postService = new PostService();
    }

    public async IsPageDisplayed(): Promise<void> {
        await t
            .expect(this.blkHeader.exists).ok()
            .expect(this.blkFooter.exists).ok()
            .expect(this.blkThread.exists).ok();
    }

    public async SetTitleFromDb(title: string): Promise<LayoutDomain> {
        return await this.layoutService.SetTitle(title);
    }

    public async SetHeaderFromDb(headerMd: string): Promise<LayoutDomain> {
        return await this.layoutService.SetHeader(headerMd);
    }

    public async SetFooterFromDb(footerMd: string): Promise<LayoutDomain> {
        return await this.layoutService.SetFooter(footerMd);
    }

    public async BeforeAll(): Promise<void> {
        this.initialLayout = await this.layoutService.Get();
    }

    public async AfterAll(): Promise<void> {
        await this.layoutService.Save(this.initialLayout);
        await this.postService.CleanupTestRun();
    }

    public async UpsertPostToDb(title: string, previewText: string, fullText, isPublished: boolean, tags: string[]): Promise<PostDomain> {
        return await this.postService.UpsertPost(title, previewText, fullText, isPublished, tags);
    }

    public async IsPostOnPage(post: PostDomain): Promise<boolean> {
        const onPage = await this.FindPostOnPage(post.title);
        if (onPage) {
            return await onPage.exists;
        }

        return false;
    }

    public async isPreviewPostDisplayed(post: PostDomain): Promise<void> {
        const onPage = await this.FindPostOnPage(post.title);

        await t
            .expect(onPage.find(this.headerSelector).innerText).eql(post.title)
            .expect(onPage.find(this.markdownSelector).innerText).contains(post.previewText)
            .expect(onPage.find(this.tagsSelector).count).eql(post.tags.length);
    }

    public async IsFullPostDisplayed(post: PostDomain): Promise<void> {
        const headerSelector = Selector(this.headerSelector);
        const contentSelector = Selector(this.markdownSelector);
        const tagsSelector = Selector(this.tagsSelector);

        await t
            .expect(headerSelector.innerText).eql(post.title)
            .expect(contentSelector.innerText).eql(post.fullText)
            .expect(tagsSelector.count).eql(post.tags.length);
    }

    public async GoToFullPostView(post: PostDomain): Promise<void> {
        const onPage = await this.FindPostOnPage(post.title);
        await t.click(onPage.find('.link-header'));
    }

    private async FindPostOnPage(title: string): Promise<Selector> {
        const count = await this.blkThread.count;
        for (var _i = 0; _i < count; _i++) {
            const entries = this.blkThread.nth(_i).find('.link-header h2');
            const postTitle = await entries.nth(0).innerText;

            if (postTitle == title) {
                return this.blkThread.nth(_i);
            }
        }

        return null;
    }
}