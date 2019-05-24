import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { AppState } from "../../store";
import { getToken, authCredentials } from './../../store/login/actions';
import { AuthState } from "../../store/login/reducers";

import 'Styles/login.scss';

interface StateProps {
    auth: AuthState;
}

interface DispatchProps {
    getToken: typeof getToken;
    authCredentials: typeof authCredentials;
}

type AllProps = StateProps & DispatchProps;

interface State {
    email: string;
    password: string;
}

class Login extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);

        this.state = { email: '', password: '' };

        this.props.getToken();
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    };

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        const { email, password } = this.state;
        this.props.authCredentials(email, password);
        this.setState({ email: '', password: '' });
        event.preventDefault();
    };

    public render(): React.ReactNode {
        const { isAuthorized } = this.props.auth;
        if (isAuthorized == null) {
            return null;
        }

        return (
            <React.Fragment>
                {isAuthorized && this.props.children}
                {!isAuthorized && <div className="login">
                    <form onSubmit={this.handleSubmit}>
                        <div className="login__email">
                            <label>
                                <span>Email</span>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    autoFocus
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="login__password">
                            <label>
                                <span>Password</span>
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
                                type="submit">Sign In</button>
                        </div>
                    </form>
                </div>}
            </React.Fragment>);
    };
}

const mapStateToProps = (state: AppState): StateProps => ({
    auth: state.login
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ getToken, authCredentials }, dispatch)
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Login);