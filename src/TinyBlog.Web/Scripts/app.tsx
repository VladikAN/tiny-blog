import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
import configureStore from './store';
import Dashboard from './components/dashboard';
import Post from './components/post';
import Login from './components/login';
import User from './components/user';
import Layout from './components/layout';
import Menu from './components/shared/menu';
import ReduxToastr from 'react-redux-toastr';

interface EditRouteParams { id: string };

ReactDOM.render(
    <Provider store={configureStore()}>
        <Login>
            <BrowserRouter>
                <div className="dashboard">
                    <Menu />
                    <div className="dashboard__content">
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
                            {({ match } : RouteComponentProps<EditRouteParams>) => (match && <Post entityId={match.params.id} />)}
                        </Route>
                        <Route
                            path="/admin/user"
                            exact={true}
                            component={User} />
                        <Route
                            path="/admin/layout"
                            exact={true}
                            component={Layout} />
                    </div>
                </div>
            </BrowserRouter>
        </Login>

        <ReduxToastr
            timeOut={2000}
            newestOnTop={true}
            preventDuplicates={true}
            position='top-center'
            transitionIn="fadeIn"
            transitionOut="fadeOut" />
    </Provider>,
    document.getElementById('root')
);