import { Post } from './types';
import {
    DELETE_POST_COMPLETED_MESSAGE,
    DELETE_POST_STARTED_MESSAGE,
    LOAD_POST_COMPLETED_MESSAGE,
    LOAD_POST_STARTED_MESSAGE,
    PostActionTypes,
    RESET_POST_MESSAGE,
    SAVE_POST_COMPLETED_MESSAGE,
    SAVE_POST_STARTED_MESSAGE,
    TOGGLE_POST_COMPLETED_MESSAGE,
    TOGGLE_POST_STARTED_MESSAGE
} from './actions';
import {
    REQUEST_FAILED_MESSAGE,
    SharedActionTypes
} from './../shared/actions';

export interface PostState extends Post {
    isFetching?: boolean;
    isFetched?: boolean;
    isSaving?: boolean;
    isCreated?: boolean;
    isDeleted?: boolean;
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
};

export function postReducer(state = initialState, action: PostActionTypes | SharedActionTypes): PostState {
    switch (action.type) {
        case REQUEST_FAILED_MESSAGE:
            return { ...state, isFetching: false, isSaving: false };
        case RESET_POST_MESSAGE:
            return {
                ...initialState,
                isFetching: false,
                isFetched: true
            };
        case LOAD_POST_STARTED_MESSAGE:
            return {
                ...initialState, /* drop all */
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
            return { ...state, isSaving: true };
        case SAVE_POST_COMPLETED_MESSAGE:
            if (!action.isSuccess) {
                return { ...state, isSaving: false };
            }

            return {
                ...action.post,
                isSaving: false,
                isCreated: !action.isEdit
            };
        case TOGGLE_POST_STARTED_MESSAGE:
            return { ...state, isSaving: true };
        case TOGGLE_POST_COMPLETED_MESSAGE:
            return {
                ...state,
                isPublished: action.isSuccess && action.isPublished,
                isSaving: false
            };
        case DELETE_POST_STARTED_MESSAGE:
            return { ...state, isSaving: true };
        case DELETE_POST_COMPLETED_MESSAGE:
            if (!action.isSuccess) {
                return { ...state, isSaving: false };
            }

            return {
                ...initialState,
                isSaving: false,
                isDeleted: true
            };
        default:
            return state;
    }
}