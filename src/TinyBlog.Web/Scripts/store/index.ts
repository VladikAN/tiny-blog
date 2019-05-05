import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import { postReducer } from './post/reducers';
import { threadReducer } from './thread/reducers';

const rootReducer = combineReducers({
    postReducer,
    threadReducer
});

export default function configureStore(initialState={}) {
 return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
 );
}