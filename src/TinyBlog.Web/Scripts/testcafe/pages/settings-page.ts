import { Selector, t } from 'testcafe';
import LayoutService from '../services/layout-service';
import { LayoutDomain } from '../types/layout';

export default class SettingsPage {
    public inpTitle: Selector;
    public inpDescription: Selector;
    public inpUri: Selector;
    public inpAuthor: Selector;
    public inpLanguage: Selector;
    public inpGoogleTagsCode: Selector;
    public inpHeader: Selector;
    public prwHeader: Selector;
    public inpFooter: Selector;
    public prwFooter: Selector;
    public btnSave: Selector;

    private layoutService: LayoutService;
    private initialLayout: LayoutDomain;

    public constructor() {
        this.inpTitle = Selector('input[name="title"]');
        this.inpDescription = Selector('input[name="description"]');
        this.inpUri = Selector('input[name="uri"]');
        this.inpAuthor = Selector('input[name="author"]');
        this.inpLanguage = Selector('input[name="language"]');
        this.inpGoogleTagsCode = Selector('input[name="googleTagsCode"]');
        this.inpHeader = Selector('textarea[name="headerContent"]');
        this.prwHeader = Selector('div.md-editor div.markdown').nth(0);
        this.inpFooter = Selector('textarea[name="footerContent"]');
        this.prwFooter = Selector('div.md-editor div.markdown').nth(1);
        this.btnSave = Selector('button[type="submit"]');

        this.layoutService = new LayoutService();
    }

    public async IsPageDisplayed(): Promise<void> {
        await t
            .expect(this.inpTitle.exists).ok()
            .expect(this.inpDescription.exists).ok()
            .expect(this.inpUri.exists).ok()
            .expect(this.inpAuthor.exists).ok()
            .expect(this.inpLanguage.exists).ok()
            .expect(this.inpGoogleTagsCode.exists).ok()
            .expect(this.inpHeader.exists).ok()
            .expect(this.prwHeader.exists).ok()
            .expect(this.inpFooter.exists).ok()
            .expect(this.prwFooter.exists).ok();
    }

    public async GetSettingsFromDb(): Promise<LayoutDomain> {
        return await this.layoutService.Get();
    }

    public async BeforeAll(): Promise<void> {
        this.initialLayout = await this.layoutService.Get();
    }

    public async AfterAll(): Promise<void> {
        await this.layoutService.Save(this.initialLayout);
    }
}