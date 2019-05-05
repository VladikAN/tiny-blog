import { ThreadActionTypes, LOAD_THREAD_MESSAGE } from './types';

export function loadThread() : ThreadActionTypes {
    return {
        type: LOAD_THREAD_MESSAGE
    };
}