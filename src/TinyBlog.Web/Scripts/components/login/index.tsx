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
    getToken: typeof getToken,
    authCredentials: typeof authCredentials
}

interface OwnProps {

}

type AllProps = OwnProps & StateProps & DispatchProps;

interface State {
    email?: string;
    password?: string;
}

class Login extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        this.state = {};

        this.props.getToken();
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    }

    handleSubmit = () => {
        const { email, password } = this.state;
        this.setState({ email: null, password: null });

        this.props.authCredentials(email, password);
    }

    render() {
        const { isAuthorized } = this.props.auth;
        if (isAuthorized == null) {
            return null;
        }

        return (
            <React.Fragment>
                {isAuthorized && this.props.children}
                {!isAuthorized && <div className="login">
                    <div className="login__email">
                        <label>
                            <span>Email</span>
                            <input
                                type="text"
                                name="email"
                                onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="login__password">
                        <label>
                            <span>Password</span>
                            <input
                                type="password"
                                name="password"
                                onChange={this.handleChange} />
                        </label>
                    </div>
                    <button type="button" onClick={this.handleSubmit}>Sign In</button>
                </div>}
            </React.Fragment>);
    };
}

const mapStateToProps = (state: AppState): StateProps => ({
    auth: state.login
})

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
    ...bindActionCreators({ getToken, authCredentials }, dispatch)
})

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Login);