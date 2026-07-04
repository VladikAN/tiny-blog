import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, Form, Input } from 'antd';
import { authCredentials } from './../../store/login/actions';
import { strings } from '../../localization';

interface DispatchProps {
    authCredentials: typeof authCredentials;
}

export type AllProps = DispatchProps;

interface State {
    username: string;
    password: string;
}

export class LoginForm extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);

        this.state = { username: '', password: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    };

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        const { username, password } = this.state;
        this.props.authCredentials(username, password);
        this.setState({ username: '', password: '' });
        event.preventDefault();
    };

    public render(): React.ReactNode {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card title={strings.login_signIn} style={{ width: 400 }}>
                    <Form layout="vertical" onSubmitCapture={this.handleSubmit}>
                        <Form.Item label={strings.login_username}>
                            <Input
                                type="text"
                                autoComplete="off"
                                autoFocus
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange} />
                        </Form.Item>
                        <Form.Item label={strings.login_password}>
                            <Input.Password
                                autoComplete="off"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {strings.login_signIn}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>);
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ authCredentials }, dispatch)
});

export default connect<Record<string, never>, DispatchProps>(null, mapDispatchToProps)(LoginForm);
