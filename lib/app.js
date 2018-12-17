'use strict'

const app = require('@arkecosystem/core-container');

class App {

  start(options) {
    const api = app.resolvePlugin("api");
    const monitor = app.resolvePlugin("p2p");

    if (!options.excludeIPs) {
      options.excludeIPs = [];
    }

    api.http.events.on('response', request => {
      this._log(request, options);
    });
    monitor.server._core.events.on('response', request => {
      this._log(request, options);
    });
  }

  _log(request, options) {
    const logger = app.resolvePlugin("logger");
    const method = request.method.toUpperCase();
    const ip = request.info.remoteAddress;
    if (!options.excludeIPs.includes(ip)) {
      const id = request.info.id;
      logger.debug(`${id}: [${ip}] ${method} ${request.url.path} [${request.response.statusCode}]`);
      if (method !== 'GET') {
        logger.debug(`${id}: [${ip}] ${JSON.stringify(request.payload)}`);
      }
      logger.debug(`${id}: [${ip}] headers: ${JSON.stringify(request.headers)}`);
    }
  }

}

module.exports = new App();
