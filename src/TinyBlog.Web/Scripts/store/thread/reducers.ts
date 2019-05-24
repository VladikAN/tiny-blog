import { Thread } from './types';
import {
    ThreadActionTypes,
    LOAD_THREAD_COMPLETED_MESSAGE,
    LOAD_THREAD_STARTED_MESSAGE 
} from './actions';
import {
    PostActionTypes,
    SAVE_POST_COMPLETED_MESSAGE,
    TOGGLE_POST_COMPLETED_MESSAGE,
    DELETE_POST_COMPLETED_MESSAGE
} from './../post/actions';

export interface ThreadState extends Thread {
    isFetching: boolean;
    isFetched: boolean;
}

const initialState: ThreadState = {
    posts: [],
    isFetching: false,
    isFetched: false
};

export function threadReducer(state = initialState, action: ThreadActionTypes | PostActionTypes): ThreadState {
    switch (action.type) {
        case LOAD_THREAD_STARTED_MESSAGE:
            return {
                ...state,
                isFetching: true,
                isFetched: false
            };

        case LOAD_THREAD_COMPLETED_MESSAGE:
            return {
                posts: action.posts,
                isFetching: false,
                isFetched: true
            };

        case SAVE_POST_COMPLETED_MESSAGE:
            if (!action.isSuccess) {
                return { ...state };
            }

            let isEdit = false;
            let posts = state.posts.map(item => {
                if (item.id == action.post.id) { 
                    isEdit = true;
                    return { ...action.post };
                }

                return item;
            });

            if (!isEdit) {
                posts = [ action.post, ...posts ];
            }

            return { ...state, posts: posts };
            
        case TOGGLE_POST_COMPLETED_MESSAGE:
            if (!action.isSuccess) {
                return { ...state };
            }

            return {
                ...state,
                posts: state.posts.map(item => {
                    return item.id == action.id ? { ...item, isPublished: action.isPublished } : item;
                })
            };
            
        case DELETE_POST_COMPLETED_MESSAGE:
            if (!action.isSuccess) {
                return { ...state };
            }

            return {
                ...state,
                posts: state.posts.filter(item => { return item.id != action.id; })
            };

        default:
            return state;
    }
}