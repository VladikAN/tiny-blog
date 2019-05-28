import { AuthUrl } from "./../../api/urls";
import { dropJwtToken, getJwtToken, setJwtToken } from "./../../api/jwt";
import { http } from "./../../api/http";
import { Action, Dispatch } from "redux";
import { requestFailedCreator } from "../shared/actions";

/* Messages */
export const GET_TOKEN_STARTED_MESSAGE = "GET_TOKEN_STARTED";
export const GET_TOKEN_FAILED_MESSAGE = "GET_TOKEN_FAILED";
export const GET_TOKEN_SUCCESS_MESSAGE = "GET_TOKEN_SUCCESS";

export const AUTH_STARTED_MESSAGE = "AUTH_STARTED";
export const AUTH_FAILED_MESSAGE = "AUTH_FAILED";
export const AUTH_SUCCESS_MESSAGE = "AUTH_SUCCESS";

export const AUTH_LOGOUT_MESSAGE = "AUTH_LOGOUT";

/* Actions */
interface GetTokenStartedAction extends Action<typeof GET_TOKEN_STARTED_MESSAGE> {}
interface GetTokenFailedAction extends Action<typeof GET_TOKEN_FAILED_MESSAGE> {}
interface GetTokenSuccessAction extends Action<typeof GET_TOKEN_SUCCESS_MESSAGE> {}

interface AuthStartedAction extends Action<typeof AUTH_STARTED_MESSAGE> {}
interface AuthFailedAction extends Action<typeof AUTH_FAILED_MESSAGE> {}
interface AuthSuccessAction extends Action<typeof AUTH_SUCCESS_MESSAGE> {}

interface AuthLogoutAction extends Action<typeof AUTH_LOGOUT_MESSAGE> {}

export type LoginActionTypes =
    GetTokenStartedAction
    | GetTokenFailedAction
    | GetTokenSuccessAction
    | AuthStartedAction
    | AuthFailedAction
    | AuthSuccessAction
    | AuthLogoutAction;

/* Action Creators */
const getTokenStartedCreator = (): GetTokenStartedAction => { return { type: GET_TOKEN_STARTED_MESSAGE }; };
const getTokenFailedCreator = (): GetTokenFailedAction => { return { type: GET_TOKEN_FAILED_MESSAGE }; };
const getTokenSuccessCreator = (): GetTokenSuccessAction => { return { type: GET_TOKEN_SUCCESS_MESSAGE }; };

const authStartedCreator = (): AuthStartedAction => { return { type: AUTH_STARTED_MESSAGE }; };
const authFailedCreator = (): AuthFailedAction => { return { type: AUTH_FAILED_MESSAGE }; };
const authSuccessCreator = (): AuthSuccessAction => { return { type: AUTH_SUCCESS_MESSAGE }; };

const authLogoutCreator = (): AuthLogoutAction => { return { type: AUTH_LOGOUT_MESSAGE }; };

interface AuthResponseModel {
    email: string;
    token: string;
}

export const getToken = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(getTokenStartedCreator());
    const token = getJwtToken();
    if (token) {
        dispatch(getTokenSuccessCreator());
    } else {
        dispatch(getTokenFailedCreator());
    }
};

export const authCredentials = (email: string, password: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(authStartedCreator());
    
    const request = new Request(AuthUrl, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password })
    });
    
    return await http<{ isSuccess: boolean; payload: AuthResponseModel }>(request).then(response => {
        if (response.isSuccess) {
            setJwtToken(response.payload.token);
            dispatch(authSuccessCreator());
        } else {
            dispatch(authFailedCreator());
        }
    }, reject => {
        dispatch(requestFailedCreator(reject));
    });
};

export const logout = () => async (dispatch: Dispatch): Promise<void> => {
    dropJwtToken();
    dispatch(authLogoutCreator());
};