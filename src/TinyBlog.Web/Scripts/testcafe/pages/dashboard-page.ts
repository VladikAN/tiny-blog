import { Selector, t } from 'testcafe';

export default class DashboardPage {
    public dashboard: Selector;
    public dashboardMenu: Selector;

    public constructor() {
        this.dashboard = Selector('div.dashboard');
        this.dashboardMenu = this.dashboard.find('div.dashboard__menu');
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