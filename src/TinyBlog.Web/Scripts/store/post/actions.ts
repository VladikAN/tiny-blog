import { PostActionTypes, LOAD_POST_MESSAGE } from './types';

export function loadPost(id : string) : PostActionTypes {
    return {
        type: LOAD_POST_MESSAGE,
        id: id
    };
}