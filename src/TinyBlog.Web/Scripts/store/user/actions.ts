import { Action } from 'redux';
import { User } from './types';

/* Messages */
export const GET_USERS_STARTED_MESSAGE = 'GET_USERS_STARTED';
export const GET_USERS_COMPLETED_MESSAGE = 'GET_USERS_COMPLETED';

export const ACTIVATE_USER_STARTED_MESSAGE = 'ACTIVATE_USER_STARTED';
export const ACTIVATE_USER_COMPLETED_MESSAGE = 'ACTIVATE_USER_COMPLETED';

export const DEACTIVATE_USER_STARTED_MESSAGE = 'DEACTIVATE_USER_STARTED';
export const DEACTIVATE_USER_COMPLETED_MESSAGE = 'DEACTIVATE_USER_COMPLETED';

export const DELETE_USER_STARTED_MESSAGE = 'DEACTIVATE_USER_STARTED';
export const DELETE_USER_COMPLETED_MESSAGE = 'DEACTIVATE_USER_COMPLETED';

export const SAVE_USER_STARTED_MESSAGE = 'SAVE_USER_STARTED';
export const SAVE_USER_COMPLETED_MESSAGE = 'SAVE_USER_COMPLETED';

/* Actions */
interface GetUsersStartedAction extends Action<typeof GET_USERS_STARTED_MESSAGE> {}
interface GetUsersCompletedAction extends Action<typeof GET_USERS_COMPLETED_MESSAGE> {
    isSuccess: boolean;
    users: User[];
}

interface ActivateUserStartedAction extends Action<typeof ACTIVATE_USER_STARTED_MESSAGE> {
    username: string;
}
interface ActivateUserCompletedAction extends Action<typeof ACTIVATE_USER_COMPLETED_MESSAGE> {
    isSuccess: boolean;
    username: string;
}

interface DeactivateUserStartedAction extends Action<typeof DEACTIVATE_USER_STARTED_MESSAGE> {
    username: string;
}
interface DeactivateUserCompletedAction extends Action<typeof DEACTIVATE_USER_COMPLETED_MESSAGE> {
    isSuccess: boolean;
    username: string;
}

interface DeleteUserStartedAction extends Action<typeof DELETE_USER_STARTED_MESSAGE> {
    username: string;
}
interface DeleteUserCompletedAction extends Action<typeof DELETE_USER_COMPLETED_MESSAGE> {
    isSuccess: boolean;
    username: string;
}

interface SaveUserStartedAction extends Action<typeof SAVE_USER_STARTED_MESSAGE> {}
interface SaveUserCompletedAction extends Action<typeof SAVE_USER_COMPLETED_MESSAGE> {
    isSuccess: boolean;
    user: User;
}

export type UserActionTypes =
    GetUsersStartedAction
    | GetUsersCompletedAction
    | ActivateUserStartedAction
    | ActivateUserCompletedAction
    | DeactivateUserStartedAction
    | DeactivateUserCompletedAction
    | DeleteUserStartedAction
    | DeleteUserCompletedAction
    | SaveUserStartedAction
    | SaveUserCompletedAction;

/* Action Creators */
const GetUsersStartedCreator = (): GetUsersStartedAction => {
    return { type: GET_USERS_STARTED_MESSAGE };
};
const GetUsersCompletedCreator = (isSuccess: boolean, users: User[]): GetUsersCompletedAction => {
    return { type: GET_USERS_COMPLETED_MESSAGE, isSuccess, users };
};

const ActivateUserStartedCreator = (username: string): ActivateUserStartedAction => {
    return { type: ACTIVATE_USER_STARTED_MESSAGE, username };
};
const ActivateUserCompletedCreator = (isSuccess: boolean, username: string): ActivateUserCompletedAction => {
    return { type: ACTIVATE_USER_COMPLETED_MESSAGE, isSuccess, username };
};

const DeactivateUserStartedCreator = (username: string): DeactivateUserStartedAction => {
    return { type: DEACTIVATE_USER_STARTED_MESSAGE, username };
};
const DeactivateUserCompletedCreator = (isSuccess: boolean, username: string): DeactivateUserCompletedAction => {
    return { type: DEACTIVATE_USER_COMPLETED_MESSAGE, isSuccess, username };
};

const DeleteUserStartedCreator = (username: string): DeleteUserStartedAction => {
    return { type: DELETE_USER_STARTED_MESSAGE, username };
};
const DeleteUserCompletedCreator = (isSuccess: boolean, username: string): DeleteUserCompletedAction => {
    return { type: DELETE_USER_COMPLETED_MESSAGE, isSuccess, username };
};

const SaveUserStartedCreator = (): SaveUserStartedAction => {
    return { type: SAVE_USER_STARTED_MESSAGE };
};
const SaveUserCompletedCreator = (isSuccess: boolean, user: User): SaveUserCompletedAction => {
    return { type: SAVE_USER_COMPLETED_MESSAGE, isSuccess, user };
};

/* Dispathes */