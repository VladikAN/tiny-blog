import { AuthUrl } from './../../api/urls';
import { getJwtToken, setJwtToken } from "./../../api/jwt";
import { http } from './../../api/http';
import { Dispatch, Action } from 'redux';
import { requestFailedActionCreator } from '../shared/actions';

/* Messages */
export const GET_TOKEN_STARTED_MESSAGE = 'GET_TOKEN_STARTED';
export const GET_TOKEN_FAILED_MESSAGE = 'GET_TOKEN_FAILED';
export const GET_TOKEN_SUCCESS_MESSAGE = 'GET_TOKEN_SUCCESS';

export const AUTH_STARTED_MESSAGE = 'AUTH_STARTED';
export const AUTH_FAILED_MESSAGE = 'AUTH_FAILED';
export const AUTH_SUCCESS_MESSAGE = 'AUTH_SUCCESS';

/* Actions */
interface GetTokenStartedAction extends Action<typeof GET_TOKEN_STARTED_MESSAGE> {}
interface GetTokenFailedAction extends Action<typeof GET_TOKEN_FAILED_MESSAGE> {}
interface GetTokenSuccessAction extends Action<typeof GET_TOKEN_SUCCESS_MESSAGE> { token: string }

interface AuthStartedAction extends Action<typeof AUTH_STARTED_MESSAGE> {}
interface AuthFailedAction extends Action<typeof AUTH_FAILED_MESSAGE> {}
interface AuthSuccessAction extends Action<typeof AUTH_SUCCESS_MESSAGE> { token: string }

export type LoginActionTypes =
    GetTokenStartedAction
    | GetTokenFailedAction
    | GetTokenSuccessAction
    | AuthStartedAction
    | AuthFailedAction
    | AuthSuccessAction;

/* Action Creators */
const getTokenStartedActionCreator = (): GetTokenStartedAction => {
    return { type: GET_TOKEN_STARTED_MESSAGE };
};

const getTokenFailedActionCreator = (): GetTokenFailedAction => {
    return { type: GET_TOKEN_FAILED_MESSAGE };
};

const getTokenSuccessActionCreator = (token: string): GetTokenSuccessAction => {
    return { type: GET_TOKEN_SUCCESS_MESSAGE, token };
};

const authStartedActionCreator = (): AuthStartedAction => {
    return { type: AUTH_STARTED_MESSAGE };
};

const authFailedActionCreator = (): AuthFailedAction => {
    return { type: AUTH_FAILED_MESSAGE };
};

const authSuccessActionCreator = (token: string): AuthSuccessAction => {
    return { type: AUTH_SUCCESS_MESSAGE, token };
};

interface Auth {
    email: string;
    token: string;
}

export const getToken = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(getTokenStartedActionCreator());
    const token = getJwtToken();
    if (token) {
        // verify token
        dispatch(getTokenSuccessActionCreator(token));
        return;
    }

    dispatch(getTokenFailedActionCreator());
};

export const authCredentials = (email: string, password: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(authStartedActionCreator());
    
    const request = new Request(AuthUrl, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password })
    });
    
    return await http<{ isSuccess: boolean; payload: Auth }>(request).then(response => {
        if (response.isSuccess) {
            setJwtToken(response.payload.token);
            dispatch(authSuccessActionCreator(response.payload.token));
            return;
        }

        dispatch(authFailedActionCreator());
    }).catch(response => { requestFailedActionCreator(response); });
};