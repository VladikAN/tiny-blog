import { Post, PostActionTypes, LOAD_POST_MESSAGE } from './types';

const initialState : Post = {
    title: ''
}

export function postReducer(
    state = initialState,
    action: PostActionTypes
  ) : Post {
    switch (action.type) {
      case LOAD_POST_MESSAGE:
        return {
          title: action.id
        }
      default:
        return state
    }
  }