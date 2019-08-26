import { Selector, t } from 'testcafe';
import LayoutService from '../services/layout-service';
import { LayoutDomain } from '../types/layout';

export default class HomePage {
    public blkHeader: Selector;
    public spnTitle: Selector;

    public blkContent: Selector;
    public spnHeader: Selector;
    public blkThread: Selector;

    public blkFooter: Selector;
    public spnFooter: Selector;

    private layoutService: LayoutService;
    private initialLayout: LayoutDomain;

    public constructor() {
        this.blkHeader = Selector('div.header');
        this.spnTitle = this.blkHeader.find('a.header__body_link');

        this.blkContent = Selector('div.content');
        this.spnHeader = this.blkContent.find('div.content__header');
        this.blkThread = this.blkContent.find('div.thread');

        this.blkFooter = Selector('div.footer');
        this.spnFooter = this.blkFooter.find('div.footer__body');

        this.layoutService = new LayoutService();
    }

    public async IsLoginFormDisplayed(): Promise<void> {
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
    }
}