import { Dispatch, Action } from 'redux';
import { Post } from './../post/types';
import { http } from './../../api/http';
import { LoadPostUrl, SavePostUrl, TogglePostUrl, DeletePostUrl } from './../../api/urls';
import { requestFailedActionCreator } from '../shared/actions';

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
const resetPostActionCreator = (): ResetPostAction => {
    return { type: RESET_POST_MESSAGE };
};

const loadPostStartedActionCreator = (): LoadPostStartedAction => {
    return { type: LOAD_POST_STARTED_MESSAGE };
};

const loadPostActionCreator = (post: Post): LoadPostCompletedAction => {
    return { type: LOAD_POST_COMPLETED_MESSAGE, post };
};

const SavePostStartedActionCreator = (): SavePostStartedAction => {
    return { type: SAVE_POST_STARTED_MESSAGE };
};

const SavePostCompletedActionCreator = (isSuccess: boolean, isEdit: boolean, post: Post): SavePostCompletedAction => {
    return { type: SAVE_POST_COMPLETED_MESSAGE, isSuccess, isEdit, post };
};

const TogglePostStartedActionCreator = (): TogglePostStartedAction => {
    return { type: TOGGLE_POST_STARTED_MESSAGE };
};

const TogglePostCompletedActionCreator = (id: string, isSuccess: boolean, isPublished: boolean): TogglePostCompletedAction => {
    return { type: TOGGLE_POST_COMPLETED_MESSAGE, id, isSuccess, isPublished };
};

const DeletePostStartedActionCreator = (): DeletePostStartedAction => {
    return { type: DELETE_POST_STARTED_MESSAGE };
};

const DeletePostCompletedActionCreator = (id: string, isSuccess: boolean): DeletePostCompletedAction => {
    return { type: DELETE_POST_COMPLETED_MESSAGE, id, isSuccess };
};

/* Dispatches */
export const resetPost = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(resetPostActionCreator());
};

export const loadPost = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(loadPostStartedActionCreator());
    const address = `${LoadPostUrl}/${id}`;
    return await http<Post>(address).then(response => {
        dispatch(loadPostActionCreator(response));
    }).catch(response => { requestFailedActionCreator(response); });
};

export const savePost = (post: Post) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(SavePostStartedActionCreator());

    const request = new Request(SavePostUrl, {
        method: 'POST',
        body: JSON.stringify(post)
    });

    const isEdit = !!post.id;
    return await http<{ isSuccess: boolean; payload: Post }>(request).then(response => {
        dispatch(SavePostCompletedActionCreator(response.isSuccess, isEdit, response.payload));
    }).catch(response => { requestFailedActionCreator(response); });
};

export const togglePost = (id: string, publish: boolean) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(TogglePostStartedActionCreator());

    const request = new Request(TogglePostUrl, {
        method: 'POST',
        body: JSON.stringify({ id: id, publish: publish })
    });

    return await http<{ isSuccess: boolean; isPublished: boolean }>(request).then(response => {
        const published = response.isSuccess ? publish : !publish;
        dispatch(TogglePostCompletedActionCreator(id, response.isSuccess, published));
    }).catch(response => { requestFailedActionCreator(response); });
};

export const deletePost = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(DeletePostStartedActionCreator());

    const request = new Request(`${DeletePostUrl}/${id}`, { method: 'POST' });
    return await http<{ isSuccess: boolean }>(request).then(response => {
        dispatch(DeletePostCompletedActionCreator(id, response.isSuccess));
    }).catch(response => { requestFailedActionCreator(response); });
};