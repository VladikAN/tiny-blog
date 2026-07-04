import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, Form, Input } from 'antd';
import { changePassword } from './../../store/login/actions';
import { strings } from '../../localization';
import { AuthState } from '../../store/login/reducers';
import { AppState } from '../../store';
import { notifyError } from '../../utils/notification';

interface StateProps {
    auth: AuthState;
}

interface DispatchProps {
    changePassword: typeof changePassword;
}

export type AllProps = StateProps & DispatchProps;

interface State {
    password: string;
    confirmPassword: string;
}

export class ChangePassword extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);

        this.state = { password: '', confirmPassword: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    };

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const { username, passwordToken } = this.props.auth;
        const { password, confirmPassword } = this.state;

        if (password.length == 0) {
            return;
        }

        if (password != confirmPassword) {
            notifyError(strings.change_password_operation_title, strings.change_password_confirm_not_matched);
            return;
        }

        this.props.changePassword(username, password, passwordToken);
    };

    public render(): React.ReactNode {
        const { isFetching } = this.props.auth;

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card title={strings.change_password_button} style={{ width: 400 }}>
                    <Form layout="vertical" onSubmitCapture={this.handleSubmit}>
                        <Form.Item label={strings.change_password_label}>
                            <Input.Password
                                autoComplete="off"
                                autoFocus
                                required={true}
                                minLength={6}
                                name="password"
                                placeholder={strings.change_password_placeholder}
                                value={this.state.password}
                                onChange={this.handleChange} />
                        </Form.Item>
                        <Form.Item label={strings.confirm_password_label}>
                            <Input.Password
                                autoComplete="off"
                                required={true}
                                minLength={6}
                                name="confirmPassword"
                                placeholder={strings.confirm_password_placeholder}
                                value={this.state.confirmPassword}
                                onChange={this.handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={isFetching}>
                                {strings.change_password_button}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>);
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    auth: state.login
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ changePassword }, dispatch)
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ChangePassword);
