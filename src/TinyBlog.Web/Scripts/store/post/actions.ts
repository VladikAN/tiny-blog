import { Action, Dispatch } from 'redux';
import { Post } from './../post/types';
import { http } from './../../api/http';
import { DeletePostUrl, LoadPostUrl, SavePostUrl, TogglePostUrl } from './../../api/urls';
import { requestFailedCreator } from '../shared/actions';
import { toastr } from 'react-redux-toastr';

/* Messages */
export const RESET_POST_MESSAGE ='RESET_POST';

export const LOAD_POST_STARTED_MESSAGE = 'LOAD_POST_STARTED';
export const LOAD_POST_COMPLETED_MESSAGE = 'LOAD_POST_COMPLETED';

export const SAVE_POST_STARTED_MESSAGE = 'SAVE_POST_STARTED';
export const SAVE_POST_COMPLETED_MESSAGE = 'SAVE_POST_COMPLETED';

export const TOGGLE_POST_STARTED_MESSAGE = 'TOGGLE_POST_STARTED';
export const TOGGLE_POST_COMPLETED_MESSAGE = 'TOGGLE_POST_COMPLETED';

export const DELETE_POST_STARTED_MESSAGE = 'DELETE_POST_STARTED';
export const DELETE_POST_COMPLETED_MESSAGE = 'DELETE_POST_COMPLETED';

/* Actions */
interface ResetPostAction extends Action<typeof RESET_POST_MESSAGE> {}

interface LoadPostStartedAction extends Action<typeof LOAD_POST_STARTED_MESSAGE> {}
interface LoadPostCompletedAction extends Action<typeof LOAD_POST_COMPLETED_MESSAGE> {
    post: Post;
}

interface SavePostStartedAction extends Action<typeof SAVE_POST_STARTED_MESSAGE> {}
interface SavePostCompletedAction extends Action<typeof SAVE_POST_COMPLETED_MESSAGE> {
    isSuccess: boolean;
    isEdit: boolean;
    post: Post;
}

interface TogglePostStartedAction extends Action<typeof TOGGLE_POST_STARTED_MESSAGE> {}
interface TogglePostCompletedAction extends Action<typeof TOGGLE_POST_COMPLETED_MESSAGE> {
    id: string;
    isSuccess: boolean;
    isPublished: boolean;
}

interface DeletePostStartedAction extends Action<typeof DELETE_POST_STARTED_MESSAGE> {}
interface DeletePostCompletedAction extends Action<typeof DELETE_POST_COMPLETED_MESSAGE> {
    id: string;
    isSuccess: boolean;
}

export type PostActionTypes =
    ResetPostAction
    | LoadPostStartedAction
    | LoadPostCompletedAction
    | SavePostStartedAction
    | SavePostCompletedAction
    | TogglePostStartedAction
    | TogglePostCompletedAction
    | DeletePostStartedAction
    | DeletePostCompletedAction;

/* Action Creators */
const resetPostCreator = (): ResetPostAction => {
    return { type: RESET_POST_MESSAGE };
};

const loadPostStartedCreator = (): LoadPostStartedAction => {
    return { type: LOAD_POST_STARTED_MESSAGE };
};

const loadPostCompletedCreator = (post: Post): LoadPostCompletedAction => {
    return { type: LOAD_POST_COMPLETED_MESSAGE, post };
};

const SavePostStartedCreator = (): SavePostStartedAction => {
    return { type: SAVE_POST_STARTED_MESSAGE };
};

const SavePostCompletedCreator = (isSuccess: boolean, isEdit: boolean, post: Post): SavePostCompletedAction => {
    return { type: SAVE_POST_COMPLETED_MESSAGE, isSuccess, isEdit, post };
};

const TogglePostStartedCreator = (): TogglePostStartedAction => {
    return { type: TOGGLE_POST_STARTED_MESSAGE };
};

const TogglePostCompletedCreator = (id: string, isSuccess: boolean, isPublished: boolean): TogglePostCompletedAction => {
    return { type: TOGGLE_POST_COMPLETED_MESSAGE, id, isSuccess, isPublished };
};

const DeletePostStartedCreator = (): DeletePostStartedAction => {
    return { type: DELETE_POST_STARTED_MESSAGE };
};

const DeletePostCompletedCreator = (id: string, isSuccess: boolean): DeletePostCompletedAction => {
    return { type: DELETE_POST_COMPLETED_MESSAGE, id, isSuccess };
};

/* Dispatches */
export const resetPost = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(resetPostCreator());
};

export const loadPost = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(loadPostStartedCreator());
    const address = `${LoadPostUrl}/${id}`;
    return await http<Post>(address).then(response => {
        dispatch(loadPostCompletedCreator(response));
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error('Load Post', 'Server responded with error');
    });
};

export const savePost = (post: Post) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(SavePostStartedCreator());

    const messageTitle = 'Save Post';
    const request = new Request(SavePostUrl, {
        method: 'POST',
        body: JSON.stringify(post)
    });

    const isEdit = !!post.id;
    return await http<{ isSuccess: boolean; payload: Post }>(request).then(response => {
        dispatch(SavePostCompletedCreator(response.isSuccess, isEdit, response.payload));
        if (response.isSuccess) {
            toastr.success(messageTitle, 'Request completed');
        } else {
            toastr.error(messageTitle, 'Failed to save post');
        }
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error(messageTitle, 'Server responded with error');
    });
};

export const togglePost = (id: string, publish: boolean) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(TogglePostStartedCreator());

    const messageTitle = 'Publish/Unpublish';
    const request = new Request(TogglePostUrl, {
        method: 'POST',
        body: JSON.stringify({ id: id, publish: publish })
    });

    return await http<{ isSuccess: boolean }>(request).then(response => {
        const published = response.isSuccess ? publish : !publish;
        dispatch(TogglePostCompletedCreator(id, response.isSuccess, published));
        if (response.isSuccess) {
            toastr.success(messageTitle, 'Request completed');
        } else {
            toastr.error(messageTitle, 'Failed to publish/unpublish post');
        }
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error(messageTitle, 'Server responded with error');
    });
};

export const deletePost = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(DeletePostStartedCreator());

    const messageTitle = 'Delete Post';
    const request = new Request(`${DeletePostUrl}/${id}`, { method: 'POST' });
    return await http<{ isSuccess: boolean }>(request).then(response => {
        dispatch(DeletePostCompletedCreator(id, response.isSuccess));
        if (response.isSuccess) {
            toastr.success(messageTitle, 'Request completed');
        } else {
            toastr.error(messageTitle, 'Failed to delete post');
        }
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error(messageTitle, 'Server responded with error');
    });
};