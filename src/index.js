/**
 * React.js Homepage application for Facnycars.ca.
 *
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @author Jovan Alleyne <jovan.alleyne@gmail.com>
 **/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';

import Homepage from './components/Homepage';

/**
 * @description
 * @export
 * @param {string} [appRoot='app-root']
 */
(function main(appRoot = 'app-root', document = document, window = window) {
  const store = configureStore();
  ReactDOM.render(
    <Provider store={store}>
      <Homepage />
    </Provider>,
    document.getElementById(appRoot)
  );
})('app-root', document, window);
