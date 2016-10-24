import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import getRoutes from './routes';
import SocketApi from './components/SocketApi'

const store = configureStore(window.INITIAL_STATE);

ReactDOM.render(
  <Provider store={store}>
    <SocketApi>
      <Router history={browserHistory} routes={getRoutes(store)}/>
    </SocketApi>
  </Provider>,
  document.getElementById('app')
);
