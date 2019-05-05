import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import configureStore from './store'
import Dashboard from './components/dashboard';

ReactDOM.render(
    <Provider store={configureStore()}>
      <Dashboard />
    </Provider>,
    document.getElementById('root')
  );