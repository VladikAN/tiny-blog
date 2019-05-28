import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import configureStore from "./store";
import Dashboard from "./components/dashboard";
import Post from "./components/post";
import Login from "./components/login";
import ReduxToastr from "react-redux-toastr";

ReactDOM.render(
    <Provider store={configureStore()}>
        <Login>
            <BrowserRouter>
                <Route 
                    path="/admin" 
                    exact={true} 
                    component={Dashboard} />
                <Route 
                    path="/admin/post"
                    exact={true}
                    component={Post} />
                <Route 
                    path="/admin/post/:id">
                    {({ match }) => (match && <Post entityId={match.params["id"]} />)}
                </Route>
            </BrowserRouter>

            <ReduxToastr
                timeOut={2000}
                newestOnTop={true}
                preventDuplicates={true}
                position='top-center'
                transitionIn="fadeIn"
                transitionOut="fadeOut" />
        </Login>
    </Provider>,
    document.getElementById("root")
);