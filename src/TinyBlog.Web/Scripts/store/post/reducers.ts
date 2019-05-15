import { Post } from './types';
import { PostActionTypes, LOAD_POST_COMPLETED_MESSAGE, LOAD_POST_STARTED_MESSAGE } from './actions';

export interface PostState extends Post {
  isFetching: boolean,
  isFetched: boolean
}

const initialState : PostState = {
    title: null,
    linkText: null,
    previewText: null,
    fullText: null,
    publishedAt: null,
    tags: [],
    isFetching: false,
    isFetched: false
}

export function postReducer(state = initialState, action: PostActionTypes) : PostState {
  switch (action.type) {
    case LOAD_POST_COMPLETED_MESSAGE:
      return {
        ...action.post,
        isFetching: false,
        isFetched: true
      };
    case LOAD_POST_STARTED_MESSAGE:
      return {
        ...initialState, /* drop all */
        isFetching: true,
        isFetched: false
      };
    default:
      return state
  }
}