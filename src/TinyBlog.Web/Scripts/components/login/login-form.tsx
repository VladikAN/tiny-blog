import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <div className="login__username">
                        <label>
                            <span>{strings.login_username}</span>
                            <input
                                type="text"
                                autoComplete="off"
                                autoFocus
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="login__password">
                        <label>
                            <span>{strings.login_password}</span>
                            <input
                                type="password"
                                autoComplete="off"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="login__buttons">
                        <button
                            className="btn-login"
                            type="submit">{strings.login_signIn}</button>
                    </div>
                </form>
            </div>);
    };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ authCredentials }, dispatch)
});

export default connect<{}, DispatchProps>(null, mapDispatchToProps)(LoginForm);