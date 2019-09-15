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

    public async SetTitle(title: string): Promise<LayoutDomain> {
        return await this.layoutService.SetTitle(title);
    }

    public async SetHeaderContent(headerMd: string): Promise<LayoutDomain> {
        return await this.layoutService.SetHeaderContent(headerMd);
    }

    public async SetFooterContent(footerMd: string): Promise<LayoutDomain> {
        return await this.layoutService.SetFooterContent(footerMd);
    }

    public async BeforeAll(): Promise<void> {
        this.initialLayout = await this.layoutService.Get();
    }

    public async AfterAll(): Promise<void> {
        await this.layoutService.Save(this.initialLayout);
        await this.postService.CleanupTestRun();
    }

    public async UpsertPost(title: string, previewText: string, fullText, isPublished: boolean, tags: string[]): Promise<PostDomain> {
        return await this.postService.UpsertPost(title, previewText, fullText, isPublished, tags);
    }

    public async IsPostOnPage(post: PostDomain): Promise<void> {
        const onPage = await this.FindPostOnPage(post.title);
        await t.expect(onPage.exists).ok();
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