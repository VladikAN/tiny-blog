import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { threadReducer } from './thread/reducers';

const rootReducer = combineReducers({
    thread: threadReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleware = [thunk]

export default function configureStore(initialState={}) {
 return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
 );
}

export type AppState = ReturnType<typeof rootReducer>