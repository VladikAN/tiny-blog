import {
    AUTH_FAILED_MESSAGE,
    AUTH_LOGOUT_MESSAGE,
    AUTH_STARTED_MESSAGE,
    AUTH_SUCCESS_MESSAGE,
    GET_TOKEN_FAILED_MESSAGE,
    GET_TOKEN_STARTED_MESSAGE,
    GET_TOKEN_SUCCESS_MESSAGE,
    LoginActionTypes
} from "./actions";
import {
    REQUEST_FAILED_MESSAGE,
    SharedActionTypes
} from "./../shared/actions";

export interface AuthState {
    isAuthorized?: boolean;
    isFetching: boolean;
}

const initialState: AuthState = {
    isAuthorized: null,
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
            return { ...state };

        case GET_TOKEN_FAILED_MESSAGE:
            return { ...state, isAuthorized: false };

        case GET_TOKEN_SUCCESS_MESSAGE:
            return { ...state, isAuthorized: true };

        case AUTH_STARTED_MESSAGE:
            return { ...state, isFetching: true };

        case AUTH_FAILED_MESSAGE:
            return { ...state, isAuthorized: false, isFetching: false };

        case AUTH_SUCCESS_MESSAGE:
            return { ...state, isAuthorized: true, isFetching: false };

        case AUTH_LOGOUT_MESSAGE:
            return { ...state, isAuthorized: false };

        default:
            return state;
    }
}