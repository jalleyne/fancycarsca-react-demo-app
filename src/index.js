/**
 * React.js Homepage application for Facnycars.ca.
 *
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @author Jovan Alleyne <jovan.alleyne@gmail.com>
 **/

import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './components/Homepage';

/**
 * @description
 * @export
 * @param {string} [appRoot='app-root']
 */
(function main(appRoot = 'app-root', document = document, window = window) {
  ReactDOM.render(<Homepage />, document.getElementById(appRoot));
})('app-root', document, window);
