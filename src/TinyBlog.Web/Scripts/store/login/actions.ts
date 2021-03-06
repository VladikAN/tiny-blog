import { AuthUrl, TokenVerifyUrl, ChangePasswordUrl } from './../../api/urls';
import { dropJwtToken, setJwtToken, getUsername } from './../../api/jwt';
import { http } from './../../api/http';
import { Action, Dispatch } from 'redux';
import { requestFailedCreator } from '../shared/actions';
import { toastr } from 'react-redux-toastr';
import { strings } from '../../localization';

/* Messages */
export const GET_TOKEN_STARTED_MESSAGE = 'GET_TOKEN_STARTED';
export const GET_TOKEN_FAILED_MESSAGE = 'GET_TOKEN_FAILED';
export const GET_TOKEN_SUCCESS_MESSAGE = 'GET_TOKEN_SUCCESS';

export const CHANGE_PASSWORD_STARTED_MESSAGE = 'CHANGE_PASSWORD_STARTED';
export const CHANGE_PASSWORD_FAILED_MESSAGE = 'CHANGE_PASSWORD_FAILED';
export const CHANGE_PASSWORD_COMPLETED_MESSAGE = 'CHANGE_PASSWORD_COMPLETED';

export const AUTH_STARTED_MESSAGE = 'AUTH_STARTED';
export const AUTH_FAILED_MESSAGE = 'AUTH_FAILED';
export const AUTH_SUCCESS_MESSAGE = 'AUTH_SUCCESS';

export const AUTH_LOGOUT_MESSAGE = 'AUTH_LOGOUT';

/* Actions */
interface GetTokenStartedAction extends Action<typeof GET_TOKEN_STARTED_MESSAGE> {}
interface GetTokenFailedAction extends Action<typeof GET_TOKEN_FAILED_MESSAGE> {}
interface GetTokenSuccessAction extends Action<typeof GET_TOKEN_SUCCESS_MESSAGE> {
    username: string;
}

interface ChangePasswordStartedAction extends Action<typeof CHANGE_PASSWORD_STARTED_MESSAGE> {}
interface ChangePasswordFailedAction extends Action<typeof CHANGE_PASSWORD_FAILED_MESSAGE> {}
interface ChangePasswordCompletedAction extends Action<typeof CHANGE_PASSWORD_COMPLETED_MESSAGE> {}

interface AuthStartedAction extends Action<typeof AUTH_STARTED_MESSAGE> {}
interface AuthFailedAction extends Action<typeof AUTH_FAILED_MESSAGE> {}
interface AuthSuccessAction extends Action<typeof AUTH_SUCCESS_MESSAGE> {
    username: string;
    passwordToken: string;
}

interface AuthLogoutAction extends Action<typeof AUTH_LOGOUT_MESSAGE> {}

export type LoginActionTypes =
    GetTokenStartedAction
    | GetTokenFailedAction
    | GetTokenSuccessAction
    | ChangePasswordStartedAction
    | ChangePasswordFailedAction
    | ChangePasswordCompletedAction
    | AuthStartedAction
    | AuthFailedAction
    | AuthSuccessAction
    | AuthLogoutAction;

/* Action Creators */
const getTokenStartedCreator = (): GetTokenStartedAction => { return { type: GET_TOKEN_STARTED_MESSAGE }; };
const getTokenFailedCreator = (): GetTokenFailedAction => { return { type: GET_TOKEN_FAILED_MESSAGE }; };
const getTokenSuccessCreator = (username: string): GetTokenSuccessAction => {
    return { type: GET_TOKEN_SUCCESS_MESSAGE, username: username };
};

const changePasswordStartedCreator = (): ChangePasswordStartedAction => { return { type: CHANGE_PASSWORD_STARTED_MESSAGE }; };
const changePasswordFailedCreator = (): ChangePasswordFailedAction => { return { type: CHANGE_PASSWORD_FAILED_MESSAGE }; };
const changePasswordCompletedCreator = (): ChangePasswordCompletedAction => { return { type: CHANGE_PASSWORD_COMPLETED_MESSAGE }; };

const authStartedCreator = (): AuthStartedAction => { return { type: AUTH_STARTED_MESSAGE }; };
const authFailedCreator = (): AuthFailedAction => { return { type: AUTH_FAILED_MESSAGE }; };
const authSuccessCreator = (username: string, passwordToken: string): AuthSuccessAction => {
    return { type: AUTH_SUCCESS_MESSAGE, username: username, passwordToken: passwordToken };
};

const authLogoutCreator = (): AuthLogoutAction => { return { type: AUTH_LOGOUT_MESSAGE }; };

interface AuthResponseModel {
    username: string;
    token: string;
    passwordToken: string;
}

export const getToken = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(getTokenStartedCreator());

    return await http(TokenVerifyUrl).then(
        () => {
            const username = getUsername();
            dispatch(getTokenSuccessCreator(username));
        },
        () => { dispatch(getTokenFailedCreator()); });
};

export const changePassword = (username: string, password: string, token: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(changePasswordStartedCreator());

    const request = new Request(ChangePasswordUrl, {
        method: 'POST',
        body: JSON.stringify({ username, password, token })
    });

    return await http(request).then(
        () => {
            dispatch(changePasswordCompletedCreator());
            toastr.success(strings.change_password_operation_title, strings.change_password_operation_success);
        },
        () => { dispatch(changePasswordFailedCreator()); });
};

export const authCredentials = (username: string, password: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(authStartedCreator());

    const request = new Request(AuthUrl, {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password })
    });

    return await http<{ isSuccess: boolean; payload: AuthResponseModel }>(request).then(response => {
        if (response.isSuccess) {
            const payload = response.payload;
            if (payload.token && !payload.passwordToken) {
                setJwtToken(payload.token);
            }

            dispatch(authSuccessCreator(payload.username, payload.passwordToken));
        } else {
            dispatch(authFailedCreator());
            toastr.error(strings.login_invalid_creds_title, strings.login_invalid_creds_msg);
        }
    }, reject => {
        dispatch(requestFailedCreator(reject));
    });
};

export const logout = () => async (dispatch: Dispatch): Promise<void> => {
    dropJwtToken();
    dispatch(authLogoutCreator());
};