import { Dispatch, Action } from 'redux';
import { Post } from './../post/types';
import { http } from './../../api/http';
import { LoadPostUrl, SavePostUrl, TogglePostUrl } from './../../api/urls';

/* Messages */
export const LOAD_POST_STARTED_MESSAGE = 'LOAD_POST_STARTED';
export const LOAD_POST_COMPLETED_MESSAGE = 'LOAD_POST_COMPLETED';

export const SAVE_POST_STARTED_MESSAGE = 'SAVE_POST_STARTED';
export const SAVE_POST_COMPLETED_MESSAGE = 'SAVE_POST_COMPLETED';

export const TOGGLE_POST_STARTED_MESSAGE = 'TOGGLE_POST_STARTED';
export const TOGGLE_POST_COMPLETED_MESSAGE = 'TOGGLE_POST_COMPLETED';

/* Actions */
interface LoadPostStartedAction extends Action<typeof LOAD_POST_STARTED_MESSAGE> {}
interface LoadPostAction extends Action<typeof LOAD_POST_COMPLETED_MESSAGE> {
    post: Post;
}

interface SavePostStartedAction extends Action<typeof SAVE_POST_STARTED_MESSAGE> {}
interface SavePostCompletedAction extends Action<typeof SAVE_POST_COMPLETED_MESSAGE> {
    isSuccess: boolean;
    post: Post;
}

interface TogglePostStartedAction extends Action<typeof TOGGLE_POST_STARTED_MESSAGE> {}
interface TogglePostCompletedAction extends Action<typeof TOGGLE_POST_COMPLETED_MESSAGE> {
    isSuccess: boolean;
    isPublished: boolean;
}

export type PostActionTypes =
    LoadPostStartedAction 
    | LoadPostAction
    | SavePostStartedAction
    | SavePostCompletedAction
    | TogglePostStartedAction
    | TogglePostCompletedAction;

/* Action Creators */
const loadPostStartedActionCreator = (): LoadPostStartedAction => {
    return { type: LOAD_POST_STARTED_MESSAGE };
}

const loadPostActionCreator = (post: Post): LoadPostAction => {
    return { type: LOAD_POST_COMPLETED_MESSAGE, post };
}

const SavePostStartedActionCreator = (): SavePostStartedAction => {
    return { type: SAVE_POST_STARTED_MESSAGE };
}

const SavePostCompletedActionCreator = (isSuccess: boolean, post: Post): SavePostCompletedAction => {
    return { type: SAVE_POST_COMPLETED_MESSAGE, isSuccess, post };
}

const TogglePostStartedActionCreator = (): TogglePostStartedAction => {
    return { type: TOGGLE_POST_STARTED_MESSAGE };
}

const TogglePostCompletedActionCreator = (isSuccess: boolean, isPublished: boolean): TogglePostCompletedAction => {
    return { type: TOGGLE_POST_COMPLETED_MESSAGE, isSuccess, isPublished };
}

/* Dispatches */
export const loadPost = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(loadPostStartedActionCreator());
    const address = `${LoadPostUrl}/${id}`;
    return http<Post>(address).then(response => {
        dispatch(loadPostActionCreator(response))
    });
}

export const savePost = (post: Post) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(SavePostStartedActionCreator());

    const request = new Request(SavePostUrl, {
        method: 'POST',
        body: JSON.stringify(post)
    });

    return http<{ isSuccess: boolean; payload: Post }>(request).then(response => {
        dispatch(SavePostCompletedActionCreator(response.isSuccess, response.payload))
    });
}

export const togglePost = (id: string, publish: boolean) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(TogglePostStartedActionCreator());

    const request = new Request(TogglePostUrl, {
        method: 'POST',
        body: JSON.stringify({ id: id, publish: publish })
    });

    return http<{ isSuccess: boolean; isPublished: boolean }>(request).then(response => {
        const published = response.isSuccess ? publish : !publish;
        dispatch(TogglePostCompletedActionCreator(response.isSuccess, published))
    });
}