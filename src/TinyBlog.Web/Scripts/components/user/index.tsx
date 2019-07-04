import * as React from 'react';
import { AppState } from '../../store';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout as LayoutType } from '../../store/layout/types';
import Loading from '../shared/loading';
import { strings } from '../../localization';
import { UsersState } from '../../store/user/reducers';
import { getUsers } from '../../store/user/actions';
import ActionButton from '../shared/action-button';

interface StateProps extends UsersState {
    username: string;
}

interface DispatchProps {
    getUsers: typeof getUsers;
}

interface OwnProps {
}

export type AllProps = OwnProps & StateProps & DispatchProps;

interface State extends LayoutType {
}

export class Users extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleActivity = this.handleActivity.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    public componentDidMount(): void {
        if (!this.props.isFetched && !this.props.isFetching) {
            this.props.getUsers();
        }
    }

    private handleEdit(username: string): void {
    }

    private handleActivity(username: string): void {
        const user = this.props.users.find(usr => usr.username == username);
        const message = user.isActive ? strings.user_form_deactivate_confirm : strings.user_form_activate_confirm;

        if (confirm(message)) {

        }
    }

    private handleDelete(username: string): void {
        if (confirm(strings.user_form_delete_confirm)) {

        }
    }

    public render(): React.ReactNode {
        if (this.props.isFetching) {
            return (<Loading />);
        }

        const lines = this.props.users.map(usr => {
            const activityClass = usr.isActive
                ? 'typcn-starburst-outline'
                : 'typcn-starburst';
            const activityTitle = usr.isActive
                ? strings.user_form_deactivate_action
                : strings.user_form_activate_action;
            const isLimited = usr.username == this.props.username || usr.isSuper;

            return (
                <tr key={usr.username}>
                    <td className="entities__prop">{usr.username}</td>
                    <td className="entities__prop">{usr.email}</td>
                    <td className="entities__actions">
                        <ActionButton
                            className="typcn typcn-edit"
                            title={strings.user_form_edit_action}
                            onClick={() => this.handleEdit(usr.username)} />
                        {!isLimited && <ActionButton
                            className={`typcn ${activityClass}`}
                            title={activityTitle}
                            onClick={() => this.handleActivity(usr.username)} />}
                        {!isLimited && <ActionButton
                            className="typcn typcn-trash"
                            title={strings.user_form_delete_action}
                            onClick={() => this.handleDelete(usr.username)} /> }
                    </td>
                </tr>);
        });

        return (
            <div>
                <h1>{strings.user_page_title}</h1>

                <div className="controls">
                    <div className="controls__btn">
                        <span className="typcn typcn-document-add"></span>&nbsp;{strings.user_form_add_action}
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
        getUsers
    }, dispatch)
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Users);