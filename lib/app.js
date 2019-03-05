'use strict'

class App {
  start(container, options) {
    const logger = container.resolvePlugin("logger");
    const api = container.resolvePlugin("api");
    const monitor = container.resolvePlugin("p2p");

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

  _log(logger, request, options) {
    const method = request.method.toUpperCase();
    const prefix = this._prefix(request, options);

    if (!options.excludeIPs.includes(request.info.remoteAddress)) {
      logger.debug(`${prefix} ${method} ${request.url.pathname} [${request.response.statusCode}]`);

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
