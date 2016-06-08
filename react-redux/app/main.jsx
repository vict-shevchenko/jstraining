import React from 'react';
import ReactDOM from 'react-dom';

import { compose, createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

//import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import reducers from './reducers'

import App from './components/App.jsx';

let store = createStore(reducers);

/*let store = createStore(combinedReducers, {}, compose(
  applyMiddleware(ReduxThunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));*/

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers');
    store.replaceReducer(nextReducer);
  });
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('backup_and_restore')
);
