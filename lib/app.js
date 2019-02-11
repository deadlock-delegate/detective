'use strict'

const core = require('@arkecosystem/core-container');

class App {
  start(options) {
    const api = core.app.resolvePlugin("api");
    const monitor = core.app.resolvePlugin("p2p");

    if (options.api) {
      api.http.events.on('response', request => {
        this._log(request, options);
      });
    }

    if (options.p2p) {
      monitor.server._core.events.on('response', request => {
        this._log(request, options);
      });
    }
  }

  _log(request, options) {
    const logger = core.app.resolvePlugin("logger");
    const method = request.method.toUpperCase();
    const prefix = this._prefix(request, options);

    if (!options.excludeIPs.includes(request.info.remoteAddress)) {
      logger.debug(`${prefix} ${method} ${request.url.path} [${request.response.statusCode}]`);

      if (options.payload && method !== 'GET') {
        logger.debug(`${prefix} ${JSON.stringify(request.payload)}`);
      }

      if (options.headers) {
        logger.debug(`${prefix} headers: ${JSON.stringify(request.headers)}`);
      }
    }
  }

  _prefix(request, options) {
    if (options.requestID) {
      return `${request.info.id}: [${request.info.remoteAddress}]`;
    } else {
      return `[${request.info.remoteAddress}]`;
    }
  }
}

module.exports = new App();
