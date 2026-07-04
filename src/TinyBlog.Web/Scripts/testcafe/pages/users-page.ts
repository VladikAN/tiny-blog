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
    public btnModalOk: Selector;

    private userService: UserService;

    private btnEditSelector = '[title="Edit user"]';
    private btnActivateSelector = '[title="Activate user"]';
    private btnDeactivateSelector = '[title="Deactivate user"]';
    private btnDeleteSelector = '[title="Delete user"]';

    public constructor() {
        this.blkControls = Selector('.ant-table');
        this.btnAddUser = Selector('button').withText('Add user');

        this.blkUsers = Selector('.ant-table-tbody tr');
        this.inpUsername = this.blkUsers.find('input[name=rawUsername]');
        this.inpEmail = this.blkUsers.find('input[name=rawEmail]');
        this.btnSaveChanges = this.blkUsers.find('[title="Save user"]');
        this.btnCancelChanges = this.blkUsers.find('[title="Cancel"]');
        this.btnModalOk = Selector('.ant-modal-confirm-btns .ant-btn-primary');

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
            .click(onPage.find(active ? this.btnActivateSelector : this.btnDeactivateSelector))
            .click(this.btnModalOk);
    }

    public async DeleteFromUi(email: string): Promise<void> {
        const onPage = await this.FindUserOnPage(email);
        await t
            .click(onPage.find(this.btnDeleteSelector))
            .click(this.btnModalOk);
    }

    public async StartEditFromUi(email: string): Promise<void> {
        const onPage = await this.FindUserOnPage(email);
        await t.click(onPage.find(this.btnEditSelector));
    }

    public async GetFromDb(email: string): Promise<UserDomain> {
        return await this.userService.Get(email);
    }

    public async UpsertUserToDb(username: string, isActive = true): Promise<UserDomain> {
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
        for (let _i = 0; _i < count; _i++) {
            const entries = this.blkUsers.nth(_i).find('td');
            const userEmail = await entries.nth(1).innerText;

            if (email == userEmail) {
                return this.blkUsers.nth(_i);
            }
        }

        return null;
    }
}
