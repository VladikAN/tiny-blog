import * as React from 'react';
import { AppState } from '../../store';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loading from '../shared/loading';
import { strings } from '../../localization';
import { UsersState } from '../../store/user/reducers';
import { getUsers, saveUser, activateUser, deactivateUser, deleteUser } from '../../store/user/actions';
import ActionButton from '../shared/action-button';
import { User } from '../../store/user/types';

interface StateProps extends UsersState {
    username: string;
}

interface DispatchProps {
    getUsers: typeof getUsers;
    saveUser: typeof saveUser;
    activateUser: typeof activateUser;
    deactivateUser: typeof deactivateUser;
    deleteUser: typeof deleteUser;
}

interface OwnProps {
}

export type AllProps = OwnProps & StateProps & DispatchProps;

interface State {
    mode: RowMode;
    rawUsername: string;
    rawEmail: string;
}

enum RowMode {
    None,
    Edit,
    Create
}

export class Users extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);

        this.state = {
            mode: RowMode.None,
            rawUsername: '',
            rawEmail: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleConfirmedAdd = this.handleConfirmedAdd.bind(this);
        this.handleCanceledAdd = this.handleCanceledAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleActivity = this.handleActivity.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    public componentDidMount(): void {
        if (!this.props.isFetched && !this.props.isFetching) {
            this.props.getUsers();
        }
    }

    private handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    };

    private handleAdd(): void {
        this.setState({ mode: RowMode.Create, rawUsername: '', rawEmail: '' });
    }

    private handleConfirmedAdd(): void {
        this.props.saveUser({ username: this.state.rawUsername, email: this.state.rawEmail, isActive: true });
        this.setState({ mode: RowMode.None, rawUsername: '', rawEmail: '' });
    }

    private handleCanceledAdd(): void {
        this.setState({ mode: RowMode.None, rawUsername: '', rawEmail: '' });
    }

    private handleEdit(user: User): void {
        this.setState({ mode: RowMode.Edit, rawUsername: user.username, rawEmail: user.email });
    }

    private handleActivity(user: User): void {
        const message = user.isActive ? strings.user_form_deactivate_confirm : strings.user_form_activate_confirm;
        if (confirm(message)) {
            user.isActive
                ? this.props.deactivateUser(user.username)
                : this.props.activateUser(user.username);
        }
    }

    private handleDelete(user: User): void {
        if (confirm(strings.user_form_delete_confirm)) {
            this.props.deleteUser(user.username);
        }
    }

    public render(): React.ReactNode {
        if (this.props.isFetching) {
            return (<Loading />);
        }

        const { mode, rawUsername, rawEmail } = this.state;
        let users = [...this.props.users];
        if (mode == RowMode.Create) {
            const rawUser: User = { username: rawUsername, email: rawEmail, isActive: true };
            users.unshift(rawUser);
        }

        const lines = users.map((usr, index) => {
            const activityClass = usr.isActive
                ? 'typcn-flash-outline'
                : 'typcn-flash';
            const activityTitle = usr.isActive
                ? strings.user_form_deactivate_action
                : strings.user_form_activate_action;
            const isUnderEdit = mode != RowMode.None && (index == 0 || usr.username == rawUsername);
            const isLimited = usr.username == this.props.username || usr.isSuper;

            return (
                <tr key={usr.username}>
                    <td className="entities__prop">
                        {isUnderEdit && mode == RowMode.Create && <input
                            type="text"
                            autoFocus
                            name="rawUsername"
                            onChange={this.handleChange}
                            value={rawUsername} />}
                        {(!isUnderEdit || mode != RowMode.Create) && usr.username}
                    </td>
                    <td className="entities__prop">
                        {isUnderEdit && <input
                            type="text"
                            name="rawEmail"
                            onChange={this.handleChange}
                            value={rawEmail} />}
                        {!isUnderEdit && usr.email}
                    </td>
                    <td className="entities__actions">
                        {!isUnderEdit &&
                            <React.Fragment>
                                <ActionButton
                                    className="typcn typcn-edit"
                                    title={strings.user_form_edit_action}
                                    onClick={() => this.handleEdit(usr)} />
                                {!isLimited && <ActionButton
                                    className={`typcn ${activityClass}`}
                                    title={activityTitle}
                                    onClick={() => this.handleActivity(usr)} />}
                                {!isLimited && <ActionButton
                                    className="typcn typcn-trash"
                                    title={strings.user_form_delete_action}
                                    onClick={() => this.handleDelete(usr)} /> }
                            </React.Fragment> }
                        {isUnderEdit &&
                            <React.Fragment>
                                <ActionButton
                                    className="typcn typcn-tick"
                                    title={strings.user_form_save_action}
                                    onClick={this.handleConfirmedAdd} />
                                <ActionButton
                                    className="typcn typcn-times"
                                    title={strings.user_form_cancel_action}
                                    onClick={this.handleCanceledAdd} />
                            </React.Fragment> }
                    </td>
                </tr>);
        });

        return (
            <div>
                <h1>{strings.user_page_title}</h1>

                <div className="controls">
                    <div className="controls__btn">
                        <ActionButton
                            className="typcn typcn-user-add"
                            title={strings.user_form_add_action}
                            text={strings.user_form_add_action}
                            onClick={this.handleAdd}>
                        </ActionButton>
                    </div>
                </div>

                <table className="entities">
                    <thead>
                        <tr>
                            <th className="entities__prop">{strings.user_form_username_title}</th>
                            <th className="entities__prop">{strings.user_form_email_title}</th>
                            <th className="entities__actions"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lines}
                    </tbody>
                </table>
            </div>);
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    username: state.login.username,
    ...state.user
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({
        getUsers,
        saveUser,
        activateUser,
        deactivateUser,
        deleteUser
    }, dispatch)
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Users);