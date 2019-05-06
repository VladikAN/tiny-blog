import { ThreadState, ThreadActionTypes, LOAD_THREAD_MESSAGE } from './types';

const initialState : ThreadState = {
    posts: []
}

export function threadReducer(
    state = initialState,
    action: ThreadActionTypes
  ) : ThreadState {
    switch (action.type) {
      case LOAD_THREAD_MESSAGE:
        return {
          posts: [...state.posts]
        }
      default:
        return state
    }
  }