import { Auth } from './types';
import {
    LoginActionTypes,
    GET_TOKEN_STARTED_MESSAGE,
    GET_TOKEN_FAILED_MESSAGE,
    GET_TOKEN_SUCCESS_MESSAGE,
    AUTH_STARTED_MESSAGE,
    AUTH_FAILED_MESSAGE,
    AUTH_SUCCESS_MESSAGE
} from './actions';
import {
    SharedActionTypes,
    REQUEST_FAILED_MESSAGE
} from './../shared/actions';

export interface AuthState extends Auth {
    isFetching: boolean;
}

const initialState: AuthState = {
    isAuthorized: null,
    token: '',
    isFetching: false
};

export function loginReducer(state = initialState, action: LoginActionTypes | SharedActionTypes): AuthState {
    switch (action.type) {
        case REQUEST_FAILED_MESSAGE: 
            if (action.reason instanceof Response) {
                if (action.reason.status == 401) {
                    return { ...state, isAuthorized: false, isFetching: false };
                }
            }

            return state;
        case GET_TOKEN_STARTED_MESSAGE:
            return {
                ...state
            };
        case GET_TOKEN_FAILED_MESSAGE:
            return {
                ...state,
                isAuthorized: false
            };
        case GET_TOKEN_SUCCESS_MESSAGE:
            return {
                ...state,
                isAuthorized: true,
                token: action.token
            };
        case AUTH_STARTED_MESSAGE:
            return {
                ...state,
                isFetching: true
            };
        case AUTH_FAILED_MESSAGE:
            return {
                ...state,
                isFetching: false
            };
        case AUTH_SUCCESS_MESSAGE:
            return {
                ...state,
                isAuthorized: true,
                token: action.token,
                isFetching: false
            };
        default:
            return state;
    }
}