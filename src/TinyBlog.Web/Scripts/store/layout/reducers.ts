import { Layout } from './types';
import {
    LayoutActionTypes,
    GET_LAYOUT_STARTED_MESSAGE,
    GET_LAYOUT_COMPLETED_MESSAGE,
    SAVE_LAYOUT_STARTED_MESSAGE,
    SAVE_LAYOUT_COMPLETED_MESSAGE
} from './actions';
import { 
    REQUEST_FAILED_MESSAGE,
    SharedActionTypes
} from '../shared/actions';

export interface LayoutState extends Layout {
    isFetching: boolean;
    isFetched: boolean;
    isSaving: boolean;
}

const initialState: LayoutState = {
    title: '',
    description: '',
    uri: '',
    author: '',
    language: '',
    googleTagsCode: '',
    headerContent: '',
    footerContent: '',
    isFetching: false,
    isFetched: false,
    isSaving: false
};

export function layoutReducer(state = initialState, action: LayoutActionTypes | SharedActionTypes): LayoutState {
    switch (action.type) {
        case REQUEST_FAILED_MESSAGE:
            return { ...state, isFetching: false, isSaving: false };
        case GET_LAYOUT_STARTED_MESSAGE:
            return { ...state, isFetching: true, isFetched: false };
        case GET_LAYOUT_COMPLETED_MESSAGE:
            return { ...state, ...action.layout, isFetching: false, isFetched: true };
        case SAVE_LAYOUT_STARTED_MESSAGE:
            return { ...state, isSaving: true };
        case SAVE_LAYOUT_COMPLETED_MESSAGE:
            return { ...state, ...action.layout, isSaving: false };
        default:
            return state;
    }
}