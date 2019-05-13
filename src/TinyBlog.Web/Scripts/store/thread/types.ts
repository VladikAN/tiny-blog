import { Post } from './../post/types';

export interface ThreadState {
    posts: Post[],
    isFetching: boolean,
    isFetched: boolean
}