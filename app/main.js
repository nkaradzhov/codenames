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

(function() {
  var to

  function calculate() {
    const board = document.getElementsByClassName('board')[0]
    if(board) {
      const style = board.currentStyle || window.getComputedStyle(board);
      const margin = style.marginLeft //e.g. '202px'
      const availableWidth = parseFloat(margin.substring(0, margin.length - 2))
      store.dispatch({
        type: 'WINDOW_RESIZE',
        logPosition: availableWidth > 200 ? 'left' : 'bottom'
      })
    }
  }

  window.onresize = function() {
    clearTimeout(to)
    to = setTimeout(calculate, 600)
  }

}());


ReactDOM.render(
  <Provider store={store}>
    <SocketApi>
      <Router history={browserHistory} routes={getRoutes(store)}/>
    </SocketApi>
  </Provider>,
  document.getElementById('app')
);
