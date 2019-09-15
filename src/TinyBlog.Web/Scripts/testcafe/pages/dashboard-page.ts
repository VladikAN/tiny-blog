import { Selector, t } from 'testcafe';

export default class DashboardPage {
    public dashboard: Selector;
    public dashboardMenu: Selector;
    public lnkposts: Selector;
    public lnkSettings: Selector;
    public lnkUsers: Selector;
    public lnkLogout: Selector;

    public constructor() {
        this.dashboard = Selector('div.dashboard');
        this.dashboardMenu = this.dashboard.find('div.dashboard__menu');

        this.lnkposts = this.dashboardMenu.find('a.dashboard__menu__link[href=/admin]');
        this.lnkSettings = this.dashboardMenu.find('a.dashboard__menu__link[href=/admin/layout]');
        this.lnkUsers = this.dashboardMenu.find('a.dashboard__menu__link[href=/admin/user]');
        this.lnkLogout = this.dashboardMenu.find('a.dashboard__menu__link[title=Logout]');
    }

    public async IsDisplayed(): Promise<void> {
        await t
            .expect(this.dashboard.exists).ok()
            .expect(this.dashboardMenu.exists).ok();
    }

    public async BeforeAll(): Promise<void> {
        await Promise.resolve();
    }

    public async AfterAll(): Promise<void> {
        await Promise.resolve();
    }
}