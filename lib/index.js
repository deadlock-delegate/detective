'use strict'

/**
 * This file is part of Ark Core - Detective.
 *
 * (c) roks0n
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const app = require('./app.js')

/**
 * The struct used by the plugin container.
 * @type {Object}
 */
exports.plugin = {
    pkg: require('../package.json'),
    alias: 'deadlock:detective',
    defaults: require('./defaults'),
    async register (container, options) {
        const logger = container.resolvePlugin('logger')
        logger.debug('[Detective] Starting up')
        app.start(container, options)
        logger.debug('[Detective] Up and running')
    }
}
