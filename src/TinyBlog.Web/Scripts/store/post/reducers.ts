import { Post } from './types';
import {
  PostActionTypes,
  LOAD_POST_STARTED_MESSAGE,
  LOAD_POST_COMPLETED_MESSAGE,
  UPDATE_POST_STARTED_MESSAGE,
  UPDATE_POST_COMPLETED_MESSAGE
} from './actions';

export interface PostState extends Post {
  isFetching?: boolean,
  isFetched?: boolean,
  isUpdating?: boolean
}

const initialState : PostState = {
    title: null,
    linkText: null,
    previewText: null,
    fullText: null,
    publishedAt: null,
    tags: [],
    isPublished: false
}

export function postReducer(state = initialState, action: PostActionTypes) : PostState {
  switch (action.type) {
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
    case UPDATE_POST_STARTED_MESSAGE:
      return {
        ...state,
        isUpdating: true
      }
    case UPDATE_POST_COMPLETED_MESSAGE:
      return {
        ...action.post,
        isUpdating: false
      }
    default:
      return state
  }
}