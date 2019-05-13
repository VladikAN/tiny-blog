import { Post } from './../post/types';

export const LOAD_THREAD_MESSAGE = 'LOAD_THREAD';
export const LOAD_THREAD_STARTED_MESSAGE = 'LOAD_THREAD_STARTED';

interface LoadThreadAction {
    type: string,
    posts: Post[]
}

interface LoadThreadStartedAction {
    type: string
}

export type ThreadActionTypes = LoadThreadAction | LoadThreadStartedAction;

export const loadThread = (posts: Post[]) : LoadThreadAction => {
    return { type: LOAD_THREAD_MESSAGE, posts };
}

export const loadThreadStarted = () : LoadThreadStartedAction => {
    return { type: LOAD_THREAD_STARTED_MESSAGE };
}