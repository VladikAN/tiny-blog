import { Dispatch, Action } from 'redux';
import { Post } from './../post/types';
import { http } from './../../api/http';
import { LoadPostUrl } from './../../api/urls';

/* Messages */
export const LOAD_POST_STARTED_MESSAGE = 'LOAD_POST_STARTED';
export const LOAD_POST_COMPLETED_MESSAGE = 'LOAD_POST_COMPLETED';

/* Actions */
interface LoadPostStartedAction extends Action<typeof LOAD_POST_STARTED_MESSAGE> {
}

interface LoadPostAction extends Action<typeof LOAD_POST_COMPLETED_MESSAGE> {
    post: Post
}

export type PostActionTypes = LoadPostStartedAction | LoadPostAction;

/* Action Creators */
const loadPostStartedActionCreator = () : LoadPostStartedAction => {
    return { type: LOAD_POST_STARTED_MESSAGE };
}

const loadPostActionCreator = (post: Post) : LoadPostAction => {
    return { type: LOAD_POST_COMPLETED_MESSAGE, post };
}

/* Dispatches */
export const loadPost = (linkText: string) => async (dispatch : Dispatch) : Promise<void> => {
    dispatch(loadPostStartedActionCreator());
    const address = `${LoadPostUrl}/${linkText}`;
    return http<Post>(address).then(response => {
        dispatch(loadPostActionCreator(response))
    });
}