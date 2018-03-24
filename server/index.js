// mock responses until the services get created.
require('./__route-mocks');

//
const path = require('path');

//
const ApplicationServer = require('./server');

const proxyRoutes = require('./proxy-routes');
const localRoutes = require('./local-routes');

/**
 * @description
 * @export
 * @class ApplicationServer
 */
module.exports =
  /**
   * @description
   * @export
   */
  (async function main() {
    // Create a server with a host and port
    const server = new ApplicationServer({});

    // Configure logging
    await server.register([
      require('inert'),
      {
        plugin: require('hapi-pino'),
        options: {
          prettyPrint: true,
          logEvents: ['response'],
        },
      },
    ]);

    // Setup routes
    server.route(localRoutes());
    server.route(proxyRoutes());

    // Start the server
    await server.connect();
  })();
