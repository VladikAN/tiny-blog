import * as React from 'react';
import { AppState } from '../../store';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Input, Modal, Space, Table, Typography } from 'antd';
import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    ThunderboltOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import Loading from '../shared/loading';
import { strings } from '../../localization';
import { UsersState } from '../../store/user/reducers';
import { getUsers, saveUser, activateUser, deactivateUser, deleteUser } from '../../store/user/actions';
import { User } from '../../store/user/types';

const { Title } = Typography;

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
        Modal.confirm({
            title: message,
            onOk: () => {
                user.isActive
                    ? this.props.deactivateUser(user.username)
                    : this.props.activateUser(user.username);
            }
        });
    }

    private handleDelete(user: User): void {
        Modal.confirm({
            title: strings.user_form_delete_confirm,
            okType: 'danger',
            onOk: () => this.props.deleteUser(user.username)
        });
    }

    public render(): React.ReactNode {
        if (this.props.isFetching) {
            return (<Loading />);
        }

        const { mode, rawUsername, rawEmail } = this.state;
        const users = [...this.props.users];
        if (mode == RowMode.Create) {
            const rawUser: User = { username: rawUsername, email: rawEmail, isActive: true };
            users.unshift(rawUser);
        }

        const columns = [
            {
                title: strings.user_form_username_title,
                dataIndex: 'username',
                key: 'username',
                render: (value: string, record: User, index: number) => {
                    const isUnderEdit = mode != RowMode.None && (index == 0 || record.username == rawUsername);
                    if (isUnderEdit && mode == RowMode.Create) {
                        return (
                            <Input
                                type="text"
                                autoFocus
                                name="rawUsername"
                                onChange={this.handleChange}
                                value={rawUsername} />
                        );
                    }
                    return value;
                }
            },
            {
                title: strings.user_form_email_title,
                dataIndex: 'email',
                key: 'email',
                render: (value: string, record: User, index: number) => {
                    const isUnderEdit = mode != RowMode.None && (index == 0 || record.username == rawUsername);
                    if (isUnderEdit) {
                        return (
                            <Input
                                type="text"
                                name="rawEmail"
                                onChange={this.handleChange}
                                value={rawEmail} />
                        );
                    }
                    return value;
                }
            },
            {
                title: '',
                key: 'actions',
                width: 160,
                render: (_: unknown, record: User, index: number) => {
                    const isUnderEdit = mode != RowMode.None && (index == 0 || record.username == rawUsername);
                    const isLimited = record.username == this.props.username || record.isSuper;

                    if (isUnderEdit) {
                        return (
                            <Space>
                                <Button
                                    type="text"
                                    icon={<CheckOutlined />}
                                    title={strings.user_form_save_action}
                                    onClick={this.handleConfirmedAdd} />
                                <Button
                                    type="text"
                                    icon={<CloseOutlined />}
                                    title={strings.user_form_cancel_action}
                                    onClick={this.handleCanceledAdd} />
                            </Space>
                        );
                    }

                    return (
                        <Space>
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                title={strings.user_form_edit_action}
                                onClick={() => this.handleEdit(record)} />
                            {!isLimited && (
                                <Button
                                    type="text"
                                    icon={<ThunderboltOutlined />}
                                    title={record.isActive
                                        ? strings.user_form_deactivate_action
                                        : strings.user_form_activate_action}
                                    onClick={() => this.handleActivity(record)} />
                            )}
                            {!isLimited && (
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    title={strings.user_form_delete_action}
                                    onClick={() => this.handleDelete(record)} />
                            )}
                        </Space>
                    );
                }
            }
        ];

        return (
            <div>
                <Title level={2}>{strings.user_page_title}</Title>

                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                    <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={this.handleAdd}>
                        {strings.user_form_add_action}
                    </Button>
                </div>

                <Table
                    dataSource={users}
                    columns={columns}
                    rowKey="username"
                    pagination={false}
                />
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
