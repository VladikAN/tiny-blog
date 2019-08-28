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
        const count = await this.blkUsers.count;
        for (var _i = 0; _i < count; _i++) {
            //const username = this.blkUsers.nth(_i).find('td').nth(0);
            //const email = this.blkUsers.nth(_i).find('td').nth(1);
        }
    }

    public async Get(email: string): Promise<UserDomain> {
        return await this.userService.Get(email);
    }

    public async CreateUser(username: string, email: string): Promise<void> {
        await t
            .click(this.btnAddUser)
            .expect(this.inpUsername.exists).eql(true)
            .expect(this.inpEmail.exists).eql(true)
            .typeText(this.inpUsername, username, { replace: true })
            .typeText(this.inpEmail, email, { replace: true })
            .expect(this.btnSaveChanges.exists).eql(true)
            .click(this.btnSaveChanges);
    }

    public async BeforeAll(): Promise<void> {
        await Promise.resolve();
    }

    public async AfterAll(): Promise<void> {
        await Promise.resolve();
    }
}