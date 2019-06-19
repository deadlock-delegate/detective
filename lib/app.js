'use strict'

class App {
    start (container, options) {
        const logger = container.resolvePlugin('logger')
        const api = container.resolvePlugin('api')
        const p2p = container.resolvePlugin('p2p')

        if (options.api) {
            api.http.events.on('response', request => {
                const method = request.method.toUpperCase()
                const prefix = this._prefix(request, options)
                if (!options.excludeIPs.includes(request.info.remoteAddress)) {
                    logger.debug(`${prefix} ${method} ${request.url.pathname} [${request.response.statusCode}]`)

                    if (options.payload && method !== 'GET') {
                        logger.debug(`${prefix} ${JSON.stringify(request.payload)}`)
                    }

                    if (options.headers) {
                        logger.debug(`${prefix} headers: ${JSON.stringify(request.headers)}`)
                    }
                }
            })
        }

        if (options.p2p) {
            const socket = p2p.getMonitor().getServer()
            socket.on('workerMessage', async (workerId, req, res) => {
                const { endpoint, data } = req
                if (options.p2pExcludeNoData && !data) {
                    return
                }
                logger.debug(`[Detective] ${endpoint}: ${JSON.stringify(data)}`)
            })
        }
    }

    _prefix (request, options) {
        if (options.requestID) {
            return `${request.info.id}: [${request.info.remoteAddress}]`
        } else {
            return `[${request.info.remoteAddress}]`
        }
    }
}

module.exports = new App()
