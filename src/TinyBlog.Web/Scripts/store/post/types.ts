export interface Post {
    title: string
}

export const LOAD_POST_MESSAGE = 'LOAD_POST_MESSAGE';

interface LoadPostAction {
    type: typeof LOAD_POST_MESSAGE,
    id: string
}

export type PostActionTypes = LoadPostAction;