import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './login-form';
import ChangePassword from './change-password';
import { AppState } from '../../store';
import { getToken } from './../../store/login/actions';
import { AuthState } from '../../store/login/reducers';

interface StateProps {
    auth: AuthState;
}

interface DispatchProps {
    getToken: typeof getToken;
}

export type AllProps = StateProps & DispatchProps;

export class Login extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);

        this.props.getToken();
    }

    public render(): React.ReactNode {
        const { isAuthorized, passwordToken } = this.props.auth;
        if (isAuthorized == null) {
            return null;
        }

        if (isAuthorized) {
            return this.props.children;
        }

        if (passwordToken != null && passwordToken.length > 0) {
            return (<ChangePassword />);
        }

        return <LoginForm />;
    };
}

const mapStateToProps = (state: AppState): StateProps => ({
    auth: state.login
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ getToken }, dispatch)
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Login);