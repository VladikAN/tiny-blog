import { Store, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { threadReducer } from './thread/reducers';
import { postReducer } from './post/reducers';
import { loginReducer } from './login/reducers';
import { layoutReducer } from './layout/reducers';

const rootReducer = combineReducers({
    thread: threadReducer,
    post: postReducer,
    login: loginReducer,
    layout: layoutReducer,
    toastr: toastrReducer
});

let middleware = [thunk];

export default function configureStore(initialState={}): Store {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    );
}

export type AppState = ReturnType<typeof rootReducer>;