import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import getRoutes from './routes';
import SocketApi from './components/SocketApi'
import { saveGamePositions, loadGamePositions } from './localStorage'

const store = configureStore(Object.assign({}, window.INITIAL_STATE, {
  gamePositions: loadGamePositions()
}));

store.subscribe(() => saveGamePositions(store.getState().gamePositions))

ReactDOM.render(
  <Provider store={store}>
    <SocketApi>
      <Router history={browserHistory} routes={getRoutes(store)}/>
    </SocketApi>
  </Provider>,
  document.getElementById('app')
);
