/**
 * Module Dependencies
 */
import { createActions } from 'redux-actions';

/**
 * Action types
 */
export const {
  listCarsRequest,
  listCarsSuccess,
  listCarsError,
} = createActions({
  LIST_CARS_REQUEST: [() => null, () => ({ isFetching: true })],
  LIST_CARS_SUCCESS: [
    response => response,
    () => ({ isFetching: false, updatedOn: new Date() }),
  ],
  LIST_CARS_ERROR: [error => error, () => ({ isFetching: false })],
});

/**
 * @description
 * @export
 * @param {any} api
 * @returns
 */
export function fetchListOfCars(api) {
  return api('/api/cars', { method: 'GET' });
}

/**
 * getPage - Description
 *
 * @param {string} [route=*] Description
 *
 * @return {type} Description
 */
export function listCars() {
  return function(dispatch, getState, { api }) {
    dispatch(listCarsRequest());
    return fetchListOfCars(api)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then(response => response.json())
      .then(response => dispatch(listCarsSuccess(response)))
      .catch(error => dispatch(listCarsError(error)));
  };
}
