import { Selector, t } from 'testcafe';

export default class HomePage {
    public blkHeader: Selector;
    public spnTitle: Selector;

    public blkFooter: Selector;
    public spnFooter: Selector;

    public blkThread: Selector;

    public constructor() {
        this.blkHeader = Selector('div.header');
        this.spnTitle = this.blkHeader.find('a.header__body_link');

        this.blkFooter = Selector('div.footer');
        this.spnFooter = this.blkFooter.find('div.footer__body');

        this.blkThread = Selector('div.thread');
    }

    public async BeforeAll(): Promise<void> {
        await Promise.resolve();
    }

    public async AfterAll(): Promise<void> {
        await Promise.resolve();
    }
}