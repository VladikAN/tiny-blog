import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changePassword } from './../../store/login/actions';
import { strings } from '../../localization';
import { AuthState } from '../../store/login/reducers';
import { AppState } from '../../store';
import { toastr } from 'react-redux-toastr';

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
            toastr.error(strings.change_password_operation_title, strings.change_password_confirm_not_matched);
            return;
        }

        this.props.changePassword(username, password, passwordToken);
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
                    <div className="login__password">
                        <label>
                            <span>{strings.confirm_password_label}</span>
                            <input
                                type="password"
                                autoComplete="off"
                                required={true}
                                minLength={6}
                                name="confirmPassword"
                                placeholder={strings.confirm_password_placeholder}
                                value={this.state.confirmPassword}
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