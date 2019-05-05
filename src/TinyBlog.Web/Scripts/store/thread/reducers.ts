import { Thread, ThreadActionTypes, LOAD_THREAD_MESSAGE } from './types';

const initialState : Thread = {
    posts: []
}

export function threadReducer(
    state = initialState,
    action: ThreadActionTypes
  ) : Thread {
    switch (action.type) {
      case LOAD_THREAD_MESSAGE:
        return {
          posts: [...state.posts]
        }
      default:
        return state
    }
  }