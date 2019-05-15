import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";
import configureStore from './store'
import Dashboard from './components/dashboard';
import Post from './components/post';

ReactDOM.render(
    <Provider store={configureStore()}>
    <Router>
      <Route 
        path="/admin" 
        exact={true} 
        component={Dashboard} />
      <Route 
        path="/admin/post/:id" 
        children={({ match:match }) => (match && <Post id={match.params['id']} />)} />
    </Router>
    </Provider>,
    document.getElementById('root')
  );