import { Selector, t } from 'testcafe';

export default class DashboardPage {
    public dashboard: Selector;
    public dashboardMenu: Selector;
    public lnkposts: Selector;
    public lnkSettings: Selector;
    public lnkUsers: Selector;
    public lnkLogout: Selector;

    public constructor() {
        this.dashboard = Selector('.ant-layout');
        this.dashboardMenu = Selector('.ant-layout-sider');

        this.lnkposts = Selector('.ant-menu-item').withText('Posts');
        this.lnkSettings = Selector('.ant-menu-item').withText('Settings');
        this.lnkUsers = Selector('.ant-menu-item').withText('Users');
        this.lnkLogout = Selector('.ant-menu-item').withText('Logout');
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
