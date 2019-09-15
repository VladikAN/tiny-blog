import { Selector, t } from 'testcafe';
import UserService from '../services/user-service';
import { UserDomain } from '../types/user';
import { DefaultPassword } from '../constants';

export default class LoginPage {
    public form: Selector;
    public inpUsername: Selector;
    public inpPassword: Selector;
    public btnSubmit: Selector;

    private userService: UserService;

    public constructor() {
        this.form = Selector('div.login form');
        this.inpUsername = this.form.find('input[type=text][name=username]');
        this.inpPassword = this.form.find('input[type=password][name=password]');
        this.btnSubmit = this.form.find('button[type=submit]');

        this.userService = new UserService();
    }

    public async IsPageDisplayed(): Promise<void> {
        await t
            .expect(this.form.exists).ok()
            .expect(this.inpUsername.exists).ok()
            .expect(this.inpPassword.exists).ok()
            .expect(this.btnSubmit.exists).ok()
            .expect(this.btnSubmit.innerText).eql('Sign In');
    }

    public async IsChangePasswordDisplayed(): Promise<void> {
        await t
            .expect(this.form.exists).ok()
            .expect(this.inpUsername.exists).notOk()
            .expect(this.inpPassword.exists).ok()
            .expect(this.btnSubmit.exists).ok()
            .expect(this.btnSubmit.innerText).eql('Change Password');
    }

    public async LoginAsDefault(): Promise<void> {
        const username = 'default-admin';
        await this.UpsertUserToDB(username, false, true);
        await this.Login(username, DefaultPassword);
    }

    public async Login(username: string, password: string): Promise<void> {
        await t
            .typeText(this.inpUsername, username)
            .typeText(this.inpPassword, password)
            .click(this.btnSubmit);
    }

    public async UpsertUserToDB(username: string, requestPasswordChange: boolean = false, isActive: boolean = true): Promise<UserDomain> {
        return await this.userService.UpsertUser(username, requestPasswordChange, isActive);
    }

    public async BeforeAll(): Promise<void> {
        await Promise.resolve();
    }

    public async AfterAll(): Promise<void> {
        await this.userService.CleanupTestRun();
    }
}