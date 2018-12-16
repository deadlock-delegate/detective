'use strict'

const app = require('@arkecosystem/core-container');

class App {

  start() {
    const api = app.resolvePlugin("api");
    const monitor = app.resolvePlugin("p2p");

    api.http.events.on('response', request => {
      this._log(request);
    });
    monitor.server._core.events.on('response', request => {
      this._log(request);
    });
  }

  _log(request) {
    const logger = app.resolvePlugin("logger");
    const method = request.method.toUpperCase();
    const ip = request.info.remoteAddress;
    logger.debug(`[${ip}] ${method} ${request.url.path} [${request.response.statusCode}]`);
    if (method !== 'GET') {
      logger.debug(`[${ip}] ${JSON.stringify(request.payload)}`);
    }
    logger.debug(`[${ip}] headers: ${JSON.stringify(request.headers)}`);
  }

}

module.exports = new App();
