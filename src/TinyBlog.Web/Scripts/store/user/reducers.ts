import { User } from './types';
import {
    UserActionTypes,
    GET_USERS_STARTED_MESSAGE,
    GET_USERS_COMPLETED_MESSAGE,
    ACTIVATE_USER_STARTED_MESSAGE,
    ACTIVATE_USER_COMPLETED_MESSAGE,
    DEACTIVATE_USER_STARTED_MESSAGE,
    DEACTIVATE_USER_COMPLETED_MESSAGE,
    DELETE_USER_STARTED_MESSAGE,
    DELETE_USER_COMPLETED_MESSAGE,
    SAVE_USER_STARTED_MESSAGE,
    SAVE_USER_COMPLETED_MESSAGE
} from './actions';
import {
    REQUEST_FAILED_MESSAGE,
    SharedActionTypes
} from '../shared/actions';

enum OperationType {
    None,
    Activate,
    Deactivate,
    Delete,
    Save
}

interface UserOperation {
    username: string;
    type: OperationType;
}

export interface UsersState {
    users: User[];
    operation: UserOperation;
    isFetching: boolean;
    isFetched: boolean;
}

const initialState: UsersState = {
    users: [],
    operation: null,
    isFetching: false,
    isFetched: false
};

export function userReducer(state = initialState, action: UserActionTypes | SharedActionTypes): UsersState {
    switch (action.type) {
        case REQUEST_FAILED_MESSAGE:
            return { ...state, operation: null, isFetching: false, isFetched: false };

        case GET_USERS_STARTED_MESSAGE:
            return { ...state, isFetching: true };
        case GET_USERS_COMPLETED_MESSAGE:
            return { ...state, users: action.users, isFetching: false, isFetched: true };

        case ACTIVATE_USER_STARTED_MESSAGE:
            return { ...state, operation: { username: action.username, type: OperationType.Activate } };
        case ACTIVATE_USER_COMPLETED_MESSAGE:
            if (!action.isSuccess) {
                return { ...state, operation: null };
            }

            return { ...state, operation: null, users: state.users.map(usr => {
                return usr.username === action.username ? { ...usr, isActive: true } : usr;
            })
            };

        case DEACTIVATE_USER_STARTED_MESSAGE:
            return { ...state, operation: { username: action.username, type: OperationType.Deactivate } };
        case DEACTIVATE_USER_COMPLETED_MESSAGE:
            if (!action.isSuccess) {
                return { ...state, operation: null };
            }

            return { ...state, operation: null, users: state.users.map(usr => {
                return usr.username == action.username ? { ...usr, isActive: false } : usr;
            })
            };

        case DELETE_USER_STARTED_MESSAGE:
            return { ...state, operation: { username: action.username, type: OperationType.Delete } };
        case DELETE_USER_COMPLETED_MESSAGE:
            if (!action.isSuccess) {
                return { ...state, operation: null };
            }

            return { ...state, operation: null, users: state.users.filter(usr => { return usr.username != action.username; }) };

        case SAVE_USER_STARTED_MESSAGE:
            return { ...state, operation: { username: action.username, type: OperationType.Save } };
        case SAVE_USER_COMPLETED_MESSAGE:
            if (!action.isSuccess) {
                return { ...state, operation: null };
            }

            let isEdit = false;
            let users = state.users.map(item => {
                if (item.username == action.user.username) {
                    isEdit = true;
                    return { ...action.user };
                }

                return item;
            });

            if (!isEdit) {
                users = [ action.user, ...users ];
            }

            return { ...state, users: users };

        default:
            return state;
    }
}