import { Selector, t } from 'testcafe';
import UserService from '../services/user-service';
import { UserDomain } from '../types/user';

export default class UsersPage {
    public blkControls: Selector;
    public btnAddUser: Selector;

    public blkUsers: Selector;
    public inpUsername: Selector;
    public inpEmail: Selector;
    public btnSaveChanges: Selector;
    public btnCancelChanges: Selector;

    private userService: UserService;

    private btnEditSelector: string = '.action .typcn-edit';
    private btnActivateSelector: string = '.action .typcn-flash';
    private btnDeactivateSelector: string = '.action .typcn-flash-outline';
    private btnDeleteSelector: string = '.action .typcn-trash';

    public constructor() {
        this.blkControls = Selector('div.controls');
        this.btnAddUser = this.blkControls.find('span.typcn.typcn-user-add');

        this.blkUsers = Selector('table.entities tbody tr');
        this.inpUsername = this.blkUsers.find('input[name=rawUsername]');
        this.inpEmail = this.blkUsers.find('input[name=rawEmail]');
        this.btnSaveChanges = this.blkUsers.find('.action .typcn-tick');
        this.btnCancelChanges = this.blkUsers.find('.action .typcn-times');

        this.userService = new UserService();
    }

    public async IsPageDisplayed(): Promise<void> {
        await t
            .expect(this.btnAddUser.exists).eql(true)
            .expect(this.blkUsers.exists).eql(true)
            .expect(this.blkUsers.count).gte(2); /* build-in user & current test admin */
    }

    public async IsUserOnPage(user: UserDomain): Promise<void> {
        const onPage = await this.FindUserOnPage(user.email);
        await t.expect(onPage.exists).ok();
    }

    public async UpdateUserFromUi(username: string, email: string, isNew: boolean): Promise<void> {
        await t
            .expect(this.inpEmail.exists).eql(true)
            .typeText(this.inpEmail, email, { replace: true });

        if (isNew) {
            await t
                .expect(this.inpUsername.exists).eql(true)
                .typeText(this.inpUsername, username, { replace: true });
        } else {
            await t
                .expect(this.inpUsername.exists).eql(false);
        }

        await t
            .expect(this.btnSaveChanges.exists).eql(true)
            .click(this.btnSaveChanges);
    }

    public async ToggleActivity(email: string, active: boolean): Promise<void> {
        const onPage = await this.FindUserOnPage(email);
        await t
            .setNativeDialogHandler(() => true)
            .click(onPage.find(active ? this.btnActivateSelector : this.btnDeactivateSelector));
    }

    public async DeleteFromUi(email: string): Promise<void> {
        const onPage = await this.FindUserOnPage(email);
        await t
            .setNativeDialogHandler(() => true)
            .click(onPage.find(this.btnDeleteSelector));
    }

    public async StartEditFromUi(email: string): Promise<void> {
        const onPage = await this.FindUserOnPage(email);
        await t.click(onPage.find(this.btnEditSelector));
    }

    public async GetFromDb(email: string): Promise<UserDomain> {
        return await this.userService.Get(email);
    }

    public async UpsertUserToDb(username: string, isActive: boolean = true): Promise<UserDomain> {
        return await this.userService.UpsertUser(username, false, isActive);
    }

    public async BeforeAll(): Promise<void> {
        await Promise.resolve();
    }

    public async AfterAll(): Promise<void> {
        await this.userService.CleanupTestRun();
    }

    private async FindUserOnPage(email: string): Promise<Selector> {
        const count = await this.blkUsers.count;
        for (var _i = 0; _i < count; _i++) {
            const entries = this.blkUsers.nth(_i).find('td');
            const userEmail = await entries.nth(1).innerText;

            if (email == userEmail) {
                return this.blkUsers.nth(_i);
            }
        }

        return null;
    }
}