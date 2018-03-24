const RouteParser = require('route-parser');
const url = require('url');
const chance = new require('chance')();
const times = require('lodash/times');
const reduce = require('lodash/reduce');
const pick = require('lodash/pick');
const find = require('lodash/find');

/**
 * @description
 * @returns
 */
function mockDataFactory() {
  return {
    cars: times(10, i => {
      return {
        id: i + 100,
        name: chance.name(),
        make: chance.pickone([
          'Honda',
          'Lexus',
          'Toyota',
          'Mitsubishi',
          'Audi',
          'BMW',
        ]),
        model: chance.name(),
        year: chance.year({ min: 2018 }),
        img: `http://lorempixel.com/400/200/transport/?${Math.random() *
          Date.now()}`,
        available: chance.pickone([
          'In Dealership',
          'Out of Stock',
          'Unavailable',
        ]),
      };
    }),
  };
}
/**
 * @description
 * @param {any} pathname
 * @returns
 */
function mockDataMatcher(method, pathname, { cars }) {
  /** */
  return reduce(
    {
      /** */
      'GET /v1/cars': function() {
        return cars.map(car =>
          pick(car, ['id', 'name', 'make', 'model', 'year', 'img'])
        );
      },
      /** */
      'GET /v1/availability?id=:id': function({ id }) {
        return pick(find(cars, car => parseInt(id) === parseInt(car.id)), [
          'id',
          'available',
        ]);
      },
    },
    (a, matcher, route) => {
      const [matchingMethod, matchingPathname] = route.split(' ');
      const parser = new RouteParser(matchingPathname);
      const match = parser.match(pathname);

      if (matchingMethod.toLowerCase() === method.toLowerCase() && match) {
        return matcher(match);
      }
      return a;
    },
    {}
  );
}

/** */
if (process.env.MOCK_RESPONSES) {
  //
  const mockery = require('mockery');
  const mockData = mockDataFactory();

  //
  mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false,
  });

  //
  const fetchMock = async function(requestUri, { method = '*' }) {
    return new Promise(resolve => {
      const parsedUri = url.parse(requestUri);
      resolve(mockDataMatcher(method, parsedUri.path, mockData));
    });
  };
  mockery.registerMock('node-fetch', fetchMock);
}
