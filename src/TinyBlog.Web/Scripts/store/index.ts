import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { threadReducer } from './thread/reducers';
import { postReducer } from './post/reducers';
import { loginReducer } from './login/reducers';

const rootReducer = combineReducers({
    thread: threadReducer,
    post: postReducer,
    login: loginReducer
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