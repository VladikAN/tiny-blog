import { Selector, t } from 'testcafe';
import UserService from '../services/user-service';
import { UserDomain } from '../types/user';

export default class LoginPage {
    public form: Selector;
    public inpUsername: Selector;
    public inpPassword: Selector;
    public btnSubmit: Selector;

    private dataService: UserService;

    public constructor() {
        this.form = Selector('div.login form');
        this.inpUsername = this.form.find('input[type=text][name=username]');
        this.inpPassword = this.form.find('input[type=password][name=password]');
        this.btnSubmit = this.form.find('button[type=submit]');

        this.dataService = new UserService();
    }

    public async IsLoginFormDisplayed(): Promise<void> {
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

    public async UpsertUser(username: string, requestPasswordChange: boolean = false, isActive: boolean = true): Promise<UserDomain> {
        return await this.dataService.UpsertUser(username, requestPasswordChange, isActive);
    }

    public async BeforeAll(): Promise<void> {
        await Promise.resolve();
    }

    public async AfterAll(): Promise<void> {
        await this.dataService.CleanupTestRun();
    }
}