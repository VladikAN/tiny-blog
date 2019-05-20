import { Auth } from './types';
import {
  LoginActionTypes,
  AUTH_STARTED_MESSAGE,
  AUTH_FAILED_MESSAGE,
  AUTH_SUCCESS_MESSAGE
} from './actions';

export interface AuthState extends Auth {
  isFetching: boolean,
  isFetched: boolean
}

const initialState : AuthState = {
    isAuthorized: false,
    token: '',
    isFetching: false,
    isFetched: false
}

export function loginReducer(state = initialState, action: LoginActionTypes) : AuthState {
  switch (action.type) {
    case AUTH_STARTED_MESSAGE:
      return {
        ...state,
        isAuthorized: false,
        token: '',
        isFetching: true,
        isFetched: true
      };
    case AUTH_FAILED_MESSAGE:
      return {
        ...state,
        isFetching: false,
        isFetched: true
      };
    case AUTH_SUCCESS_MESSAGE:
      return {
        ...state,
        isAuthorized: true,
        token: action.token,
        isFetching: false,
        isFetched: true
      };
    default:
      return state
  }
}