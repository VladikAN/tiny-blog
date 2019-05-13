import { Post } from './../post/types';

export const LOAD_THREAD_MESSAGE = 'LOAD_THREAD';
export const LOAD_THREAD_STARTED_MESSAGE = 'LOAD_THREAD_STARTED';

interface LoadThreadAction {
    type: typeof LOAD_THREAD_MESSAGE,
    posts: Post[]
}

interface LoadThreadStartedAction {
    type: typeof LOAD_THREAD_STARTED_MESSAGE
}

export type ThreadActionTypes = LoadThreadAction | LoadThreadStartedAction;

export const loadThread = (posts: Post[]) : LoadThreadAction => {
    return { type: LOAD_THREAD_MESSAGE, posts };
}

export const loadThreadStarted = () : LoadThreadStartedAction => {
    return { type: LOAD_THREAD_STARTED_MESSAGE };
}