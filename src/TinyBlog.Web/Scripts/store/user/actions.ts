import { Action, Dispatch } from 'redux';
import { User } from './types';
import { GetUsersUrl, ActivateUserUrl, DeactivateUserUrl, DeleteUserUrl, SaveUserUrl } from '../../api/urls';
import { strings } from '../../localization';
import { toastr } from 'react-redux-toastr';
import { requestFailedCreator } from '../shared/actions';
import { http } from '../../api/http';

/* Messages */
export const GET_USERS_STARTED_MESSAGE = 'GET_USERS_STARTED';
export const GET_USERS_COMPLETED_MESSAGE = 'GET_USERS_COMPLETED';

export const ACTIVATE_USER_STARTED_MESSAGE = 'ACTIVATE_USER_STARTED';
export const ACTIVATE_USER_COMPLETED_MESSAGE = 'ACTIVATE_USER_COMPLETED';

export const DEACTIVATE_USER_STARTED_MESSAGE = 'DEACTIVATE_USER_STARTED';
export const DEACTIVATE_USER_COMPLETED_MESSAGE = 'DEACTIVATE_USER_COMPLETED';

export const DELETE_USER_STARTED_MESSAGE = 'DELETE_USER_STARTED';
export const DELETE_USER_COMPLETED_MESSAGE = 'DELETE_USER_COMPLETED';

export const SAVE_USER_STARTED_MESSAGE = 'SAVE_USER_STARTED';
export const SAVE_USER_COMPLETED_MESSAGE = 'SAVE_USER_COMPLETED';

/* Actions */
interface GetUsersStartedAction extends Action<typeof GET_USERS_STARTED_MESSAGE> {}
interface GetUsersCompletedAction extends Action<typeof GET_USERS_COMPLETED_MESSAGE> {
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

interface SaveUserStartedAction extends Action<typeof SAVE_USER_STARTED_MESSAGE> {
    username: string;
}
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
const GetUsersCompletedCreator = (users: User[]): GetUsersCompletedAction => {
    return { type: GET_USERS_COMPLETED_MESSAGE, users };
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

const SaveUserStartedCreator = (username: string): SaveUserStartedAction => {
    return { type: SAVE_USER_STARTED_MESSAGE, username };
};
const SaveUserCompletedCreator = (isSuccess: boolean, user: User): SaveUserCompletedAction => {
    return { type: SAVE_USER_COMPLETED_MESSAGE, isSuccess, user };
};

/* dispatches */
export const getUsers = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(GetUsersStartedCreator());

    return await http<User[]>(GetUsersUrl).then(response => {
        dispatch(GetUsersCompletedCreator(response));
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error(strings.shared_server_error_title, strings.shared_server_error_msg);
    });
};

export const activateUser = (username: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(ActivateUserStartedCreator(username));

    const request = new Request(ActivateUserUrl, {
        method: 'POST',
        body: JSON.stringify({ username })
    });

    return await http<{ isSuccess: boolean }>(request).then(response => {
        dispatch(ActivateUserCompletedCreator(response.isSuccess, username));
        if (response.isSuccess) {
            toastr.success(strings.user_operation_title, strings.user_activate_reponse_success);
        } else {
            toastr.error(strings.user_operation_title, strings.user_activate_reponse_failed);
        }
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error(strings.shared_server_error_title, strings.shared_server_error_msg);
    });
};

export const deactivateUser = (username: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(DeactivateUserStartedCreator(username));

    const request = new Request(DeactivateUserUrl, {
        method: 'POST',
        body: JSON.stringify({ username })
    });

    return await http<{ isSuccess: boolean }>(request).then(response => {
        dispatch(DeactivateUserCompletedCreator(response.isSuccess, username));
        if (response.isSuccess) {
            toastr.success(strings.user_operation_title, strings.user_deactivate_reponse_success);
        } else {
            toastr.error(strings.user_operation_title, strings.user_deactivate_reponse_failed);
        }
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error(strings.shared_server_error_title, strings.shared_server_error_msg);
    });
};

export const deleteUser = (username: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(DeleteUserStartedCreator(username));

    const request = new Request(DeleteUserUrl, {
        method: 'POST',
        body: JSON.stringify({ username })
    });

    return await http<{ isSuccess: boolean }>(request).then(response => {
        dispatch(DeleteUserCompletedCreator(response.isSuccess, username));
        if (response.isSuccess) {
            toastr.success(strings.user_operation_title, strings.user_delete_reponse_success);
        } else {
            toastr.error(strings.user_operation_title, strings.user_delete_reponse_failed);
        }
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error(strings.shared_server_error_title, strings.shared_server_error_msg);
    });
};

export const saveUser = (user: User) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(SaveUserStartedCreator(user.username));

    const request = new Request(SaveUserUrl, {
        method: 'POST',
        body: JSON.stringify(user)
    });

    return await http<{ isSuccess: boolean }>(request).then(response => {
        dispatch(SaveUserCompletedCreator(response.isSuccess, user));
        if (response.isSuccess) {
            toastr.success(strings.user_operation_title, strings.user_save_reponse_success);
        } else {
            toastr.error(strings.user_operation_title, strings.user_save_reponse_failed);
        }
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error(strings.shared_server_error_title, strings.shared_server_error_msg);
    });
};