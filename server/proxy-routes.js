const size = require('lodash/size');
const first = require('lodash/first');
const groupBy = require('lodash/groupBy');
const fetch = require('node-fetch');
const Boom = require('boom');

/**
 * @description
 * @example  return [
          {
            name: 'Honda',
            make: 'Accord',
            model: 'LX Coupe',
            year: 2018,
            picture: 'http://lorempixel.com/400/200/transport/',
            availability: 'Unavailable',
          },
        ];
 *
 * @returns
 */
async function fetchListOfCars() {
  return fetch('https://api.auto.mobile/v1/cars', { method: 'GET' }).catch(
    function() {
      throw Boom.serverUnavailable();
    }
  );
}
/**
 * @description
 * @example  {
              availability: 'Unavailable',
          };
 *
 * @param {any} id
 * @returns
 */
async function checkCarAvailabilityById(id) {
  return fetch(`https://api.auto.mobile/v1/availability?id=${id}`, {
    method: 'GET',
  }).catch(function() {
    throw Boom.serverUnavailable();
  });
}

/**
 * @description
 * @returns
 */
async function fetchListOfCarsWithAvailability() {
  return fetchListOfCars()
    .then(cars => {
      if (size(cars)) {
        return cars;
      } else {
        return [];
      }
    })
    .then(cars => {
      return Promise.all(
        cars.map(async ({ id }) => await checkCarAvailabilityById(id))
      ).then(availability => {
        const availabilityById = groupBy(availability, ({ id }) => {
          return parseInt(id);
        });
        return cars.map(car => {
          return Object.assign(car, first(availabilityById[String(car.id)]));
        });
      });
    })
    .catch(function() {
      throw Boom.serverUnavailable();
    });
}

/**
 * @description
 * @returns
 */
function proxyRoutes() {
  return [
    {
      method: 'GET',
      path: '/api/cars',
      handler: fetchListOfCarsWithAvailability,
    },
  ];
}

/** */
module.exports = proxyRoutes;
module.exports.fetchListOfCars = fetchListOfCars;
module.exports.checkCarAvailabilityById = checkCarAvailabilityById;
module.exports.fetchListOfCarsWithAvailability = fetchListOfCarsWithAvailability;
