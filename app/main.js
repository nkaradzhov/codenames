import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import getRoutes from './routes';
import Socket from './components/Socket'

const store = configureStore(window.INITIAL_STATE);

ReactDOM.render(
  <Provider store={store}>
    <Socket namespace="/lobby">
      <Router history={browserHistory} routes={getRoutes(store)}/>
    </Socket>
  </Provider>,
  document.getElementById('app')
);
