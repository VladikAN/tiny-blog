import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changePassword } from './../../store/login/actions';
import { strings } from '../../localization';
import { AuthState } from '../../store/login/reducers';
import { AppState } from '../../store';

interface StateProps {
    auth: AuthState;
}

interface DispatchProps {
    changePassword: typeof changePassword;
}

export type AllProps = StateProps & DispatchProps;

interface State {
    password: string;
}

export class ChangePassword extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);

        this.state = { password: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    };

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        const { username, passwordToken } = this.props.auth;
        const { password } = this.state;
        if (password.length != 0) {
            this.props.changePassword(username, password, passwordToken);
        }

        event.preventDefault();
    };

    public render(): React.ReactNode {
        const {isFetching} = this.props.auth;

        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <div className="login__password">
                        <label>
                            <span>{strings.change_password_label}</span>
                            <input
                                type="password"
                                autoComplete="off"
                                autoFocus
                                required={true}
                                minLength={6}
                                name="password"
                                placeholder={strings.change_password_placeholder}
                                value={this.state.password}
                                onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="login__buttons">
                        <button
                            className="btn-login"
                            disabled={isFetching}
                            type="submit">{strings.change_password_button}</button>
                    </div>
                </form>
            </div>);
    };
}

const mapStateToProps = (state: AppState): StateProps => ({
    auth: state.login
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ changePassword }, dispatch)
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ChangePassword);