import { Action, Dispatch } from 'redux';
import { Post } from './../post/types';
import { http } from './../../api/http';
import { LoadThreadUrl } from './../../api/urls';
import { requestFailedCreator } from '../shared/actions';
import { toastr } from 'react-redux-toastr';

/* Messages */
export const LOAD_THREAD_STARTED_MESSAGE = 'LOAD_THREAD_STARTED';
export const LOAD_THREAD_COMPLETED_MESSAGE = 'LOAD_THREAD_COMPLETED';

/* Actions */
interface LoadThreadStartedAction extends Action<typeof LOAD_THREAD_STARTED_MESSAGE> {}

interface LoadThreadAction extends Action<typeof LOAD_THREAD_COMPLETED_MESSAGE> {
    posts: Post[];
}

export type ThreadActionTypes = LoadThreadStartedAction | LoadThreadAction;

/* Action Creators */
const loadThreadStartedActionCreator = (): LoadThreadStartedAction => {
    return { type: LOAD_THREAD_STARTED_MESSAGE };
};

const loadThreadActionCreator = (posts: Post[]): LoadThreadAction => {
    return { type: LOAD_THREAD_COMPLETED_MESSAGE, posts };
};

/* Dispatches */
export const loadThread = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(loadThreadStartedActionCreator());
    return await http<{ posts: Post[] }>(LoadThreadUrl).then(response => {
        dispatch(loadThreadActionCreator(response.posts));
    }, reject => {
        dispatch(requestFailedCreator(reject));
        toastr.error('Load Thread', 'Server responded with error');
    });
};