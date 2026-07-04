import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConfigProvider, App as AntApp, Layout } from 'antd';
import configureStore from './store';
import Dashboard from './components/dashboard';
import Post from './components/post';
import Login from './components/login';
import User from './components/user';
import LayoutSettings from './components/layout';
import Menu from './components/shared/menu';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <Provider store={configureStore()}>
        <ConfigProvider>
            <AntApp>
                <Login>
                    <BrowserRouter>
                        <Layout style={{ minHeight: '100vh' }}>
                            <Menu />
                            <Layout.Content style={{ padding: '24px' }}>
                                <Route
                                    path="/admin"
                                    exact={true}
                                    component={Dashboard} />
                                <Route
                                    path="/admin/post"
                                    exact={true}
                                    component={Post} />
                        <Route path="/admin/post/:id">
                            {(props) => (props.match ? <Post entityId={props.match.params.id} /> : null)}
                        </Route>
                                <Route
                                    path="/admin/user"
                                    exact={true}
                                    component={User} />
                                <Route
                                    path="/admin/layout"
                                    exact={true}
                                    component={LayoutSettings} />
                            </Layout.Content>
                        </Layout>
                    </BrowserRouter>
                </Login>
            </AntApp>
        </ConfigProvider>
    </Provider>
);
