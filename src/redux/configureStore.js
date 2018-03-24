import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from './combineReducers';
import api from '../lib/api';

/**
 * configureStore - description
 *
 * @param  {type} initialState description
 * @return {type}              description
 */
export function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk.withExtraArgument({ api }), createLogger()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./combineReducers', () => {
      const nextReducer = require('./combineReducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
