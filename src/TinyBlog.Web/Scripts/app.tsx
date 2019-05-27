import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";
import configureStore from './store';
import Dashboard from './components/dashboard';
import Post from './components/post';
import Login from './components/login';

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
                    {({ match:match }) => (match && <Post entityId={match.params['id']} />)}
                </Route>
            </BrowserRouter>
        </Login>
    </Provider>,
    document.getElementById('root')
);