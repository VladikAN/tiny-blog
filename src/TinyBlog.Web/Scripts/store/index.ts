import { Store, applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { threadReducer } from "./thread/reducers";
import { postReducer } from "./post/reducers";
import { loginReducer } from "./login/reducers";

import {reducer as toastrReducer} from "react-redux-toastr";

const rootReducer = combineReducers({
    thread: threadReducer,
    post: postReducer,
    login: loginReducer,
    toastr: toastrReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleware = [thunk];

export default function configureStore(initialState={}): Store {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );
}

export type AppState = ReturnType<typeof rootReducer>;