import { Post } from './../post/types';

export interface Thread {
    posts: Post[]
}

export const LOAD_THREAD_MESSAGE = 'LOAD_THREAD_MESSAGE';

interface LoadThreadAction {
    type: typeof LOAD_THREAD_MESSAGE
}

export type ThreadActionTypes = LoadThreadAction;