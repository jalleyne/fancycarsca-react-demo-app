const Hapi = require('hapi');
const log = require('debug')('app:server');
const { dim } = require('chalk');

/**
 * @description
 * @readonly
 * @static
 * @memberof ApplicationServer
 */
function defaultServerInterface() {
  return process.env.SERVER_INTERFACE || 'localhost';
}
/**
 * @description
 * @readonly
 * @static
 * @memberof ApplicationServer
 */
function defaultPort() {
  return process.env.PORT || 8000;
}

/**
 * @description
 * @class ApplicationServer
 */
class ApplicationServer {
  /**
   * @description
   * @readonly
   * @memberof ApplicationServer
   */
  get server() {
    return this._server;
  }
  /**
   * @description
   * @readonly
   * @memberof ApplicationServer
   */
  get info() {
    return this.server.info;
  }
  /**
   * Creates an instance of ApplicationServer.
   * @param {any} [options={host = defaultServerInterface(), port = defaultPort() }]
   * @memberof ApplicationServer
   */
  constructor(options = {}) {
    this._server = this._createServer(
      Object.assign(
        { host: defaultServerInterface(), port: defaultPort() },
        options
      )
    );
  }
  /**
   * @description
   * @param {any} [options={
   *       host = defaultServerInterface(),
   *       port = defaultPort(),
   *     }]
   * @returns
   * @memberof ApplicationServer
   */
  _createServer(options) {
    log(`Initializing server with options ${dim('%o')}`, options);
    return new Hapi.server(options);
  }
  /**
   * @description
   * @returns
   * @memberof ApplicationServer
   */
  async register() {
    log(`Registering plugins with server ${dim('%o')}`, arguments);
    return await this.server.register(...arguments);
  }

  /**
   * @description
   * @memberof ApplicationServer
   */
  async connect() {
    try {
      await this.server.start();
    } catch (err) {
      log(err);
      process.exit(1);
    }

    log(`Http server running at ${dim('%s')}`, this.info.uri);
  }
  /**
   * @description
   * @param {any} routes
   * @returns
   * @memberof ApplicationServer
   */
  route(routes) {
    log(`Registering routes with server ${dim('%o')}`, routes);
    return routes.map(route => {
      this.server.route(route);
    });
  }
}

/** */
module.exports = ApplicationServer;
