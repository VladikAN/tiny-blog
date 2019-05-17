import { Dispatch, Action } from 'redux';
import { Post } from './../post/types';
import { http } from './../../api/http';
import { LoadPostUrl, UpdatePostUrl, TogglePostUrl } from './../../api/urls';

/* Messages */
export const LOAD_POST_STARTED_MESSAGE = 'LOAD_POST_STARTED';
export const LOAD_POST_COMPLETED_MESSAGE = 'LOAD_POST_COMPLETED';

export const UPDATE_POST_STARTED_MESSAGE = 'UPDATE_POST_STARTED_MESSAGE';
export const UPDATE_POST_COMPLETED_MESSAGE = 'UPDATE_POST_COMPLETED_MESSAGE';

export const TOGGLE_POST_STARTED_MESSAGE = 'TOGGLE_POST_STARTED_MESSAGE';
export const TOGGLE_POST_COMPLETED_MESSAGE = 'TOGGLE_POST_COMPLETED_MESSAGE';

/* Actions */
interface LoadPostStartedAction extends Action<typeof LOAD_POST_STARTED_MESSAGE> {
}

interface LoadPostAction extends Action<typeof LOAD_POST_COMPLETED_MESSAGE> {
    post: Post
}

interface UpdatePostStartedAction extends Action<typeof UPDATE_POST_STARTED_MESSAGE> {
}

interface UpdatePostCompletedAction extends Action<typeof UPDATE_POST_COMPLETED_MESSAGE> {
    isSuccess: boolean,
    post: Post
}

interface TogglePostStartedAction extends Action<typeof TOGGLE_POST_STARTED_MESSAGE> {
}

interface TogglePostCompletedAction extends Action<typeof TOGGLE_POST_COMPLETED_MESSAGE> {
    isSuccess: boolean,
    isPublished: boolean
}

export type PostActionTypes =
    LoadPostStartedAction 
    | LoadPostAction
    | UpdatePostStartedAction
    | UpdatePostCompletedAction
    | TogglePostStartedAction
    | TogglePostCompletedAction;

/* Action Creators */
const loadPostStartedActionCreator = () : LoadPostStartedAction => {
    return { type: LOAD_POST_STARTED_MESSAGE };
}

const loadPostActionCreator = (post: Post) : LoadPostAction => {
    return { type: LOAD_POST_COMPLETED_MESSAGE, post };
}

const UpdatePostStartedActionCreator = () : UpdatePostStartedAction => {
    return { type: UPDATE_POST_STARTED_MESSAGE };
}

const UpdatePostCompletedActionCreator = (isSuccess: boolean, post: Post) : UpdatePostCompletedAction => {
    return { type: UPDATE_POST_COMPLETED_MESSAGE, isSuccess, post };
}

const TogglePostStartedActionCreator = () : TogglePostStartedAction => {
    return { type: TOGGLE_POST_STARTED_MESSAGE };
}

const TogglePostCompletedActionCreator = (isSuccess: boolean, isPublished: boolean) : TogglePostCompletedAction => {
    return { type: TOGGLE_POST_COMPLETED_MESSAGE, isSuccess, isPublished };
}

/* Dispatches */
export const loadPost = (linkText: string) => async (dispatch : Dispatch) : Promise<void> => {
    dispatch(loadPostStartedActionCreator());
    const address = `${LoadPostUrl}/${linkText}`;
    return http<Post>(address).then(response => {
        dispatch(loadPostActionCreator(response))
    });
}

export const updatePost = (post: Post) => async (dispatch : Dispatch) : Promise<void> => {
    dispatch(UpdatePostStartedActionCreator());

    const request = new Request(UpdatePostUrl, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return http<{ isSuccess: boolean, payload: Post }>(request).then(response => {
        dispatch(UpdatePostCompletedActionCreator(response.isSuccess, response.payload))
    });
}

export const togglePost = (linkText: string, publish: boolean) => async (dispatch : Dispatch) : Promise<void> => {
    dispatch(TogglePostStartedActionCreator());

    const request = new Request(TogglePostUrl, {
        method: 'POST',
        body: JSON.stringify({ linkText: linkText, publish: publish }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return http<{ isSuccess: boolean, isPublished: boolean }>(request).then(response => {
        const published = response.isSuccess ? publish : !publish;
        dispatch(TogglePostCompletedActionCreator(response.isSuccess, published))
    });
}