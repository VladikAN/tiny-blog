import { Post } from './types';
import {
    PostActionTypes,
    RESET_POST_MESSAGE,
    LOAD_POST_STARTED_MESSAGE,
    LOAD_POST_COMPLETED_MESSAGE,
    SAVE_POST_STARTED_MESSAGE,
    SAVE_POST_COMPLETED_MESSAGE,
    TOGGLE_POST_STARTED_MESSAGE,
    TOGGLE_POST_COMPLETED_MESSAGE,
    DELETE_POST_STARTED_MESSAGE,
    DELETE_POST_COMPLETED_MESSAGE
} from './actions';

export interface PostState extends Post {
    isFetching?: boolean;
    isFetched?: boolean;
    isSaving?: boolean;
}

const initialState: PostState = {
    id: null,
    title: null,
    linkText: null,
    previewText: null,
    fullText: null,
    publishedAt: null,
    tags: [],
    isPublished: false
}

export function postReducer(state = initialState, action: PostActionTypes): PostState {
    switch (action.type) {
        case RESET_POST_MESSAGE: 
            return {
                ...initialState,
                isFetching: false,
                isFetched: true
            };
        case LOAD_POST_STARTED_MESSAGE:
            return {
                ...state, /* drop all */
                isFetching: true,
                isFetched: false
            };
        case LOAD_POST_COMPLETED_MESSAGE:
            return {
                ...action.post,
                isFetching: false,
                isFetched: true
            };
        case SAVE_POST_STARTED_MESSAGE:
            return {
                ...state,
                isSaving: true
            }
        case SAVE_POST_COMPLETED_MESSAGE:
            return {
                ...action.post,
                isSaving: false
            }
        case TOGGLE_POST_STARTED_MESSAGE:
            return {
                ...state,
                isSaving: true
            }
        case TOGGLE_POST_COMPLETED_MESSAGE:
            return {
                ...state,
                isPublished: action.isPublished,
                isSaving: false
            }
        case DELETE_POST_STARTED_MESSAGE:
            return {
                ...state,
                isFetching: true,
                isFetched: false
            }
        case DELETE_POST_COMPLETED_MESSAGE:
            if (!action.isSuccess) {
                return { ...state };
            }

            return {
                ...initialState,
                isFetching: false,
                isFetched: true
            }
        default:
            return state
    }
}