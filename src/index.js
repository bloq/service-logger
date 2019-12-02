'use strict'

const debug = require('debug')('service-logger')
const winston = require('winston')

const supported = require('./transports')

Object.keys(supported).forEach(function(name) {
  supported[name].require(winston)
  debug('Transport %s loaded', name)
})

/**
 * Create a logger.
 *
 * @param {object} config The logger configuration.
 * @returns {winston.LoggerInstance} A Winston logger instance.
 */
function createLogger(config) {
  const transports = Object.keys(config)
    .map(
      name =>
        config[name] &&
        (supported[name] && supported[name].prop
          ? config[name][supported[name].prop]
          : true) &&
        new winston.transports[name](config[name])
    )
    .filter(transport => !!transport)
  debug('Creating logger with %d transports', transports.length)
  return new winston.Logger({ transports })
}

module.exports = createLogger
