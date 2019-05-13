import { ThreadState } from './types';
import { ThreadActionTypes, LOAD_THREAD_MESSAGE, LOAD_THREAD_STARTED_MESSAGE } from './actions';

const initialState : ThreadState = {
    posts: [],
    isFetching: false,
    isFetched: false
}

export function threadReducer(state = initialState, action: ThreadActionTypes) : ThreadState {
  switch (action.type) {
    case LOAD_THREAD_MESSAGE:
      return {
        ...state,
        isFetching: false,
        isFetched: true
      };
    case LOAD_THREAD_STARTED_MESSAGE:
      return {
        ...state,
        isFetching: true,
        isFetched: false
      };
    default:
      return state
  }
}