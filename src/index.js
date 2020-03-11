'use strict'

const debug = require('debug')('service-logger')
const winston = require('winston')

const supported = require('./transports')

/**
 * Create a new Winston transport.
 *
 * @param {object} config The logger configuration.
 * @param {string} name The name of the transport.
 * @returns {winston.TransportInstance} A new transport instance.
 */
function createTransport(config, name) {
  if (!winston.transports[name]) {
    if (!supported[name]) {
      throw new Error(`Unsupported transport ${name}`)
    }
    supported[name].require(winston)
    debug('Transport %s loaded', name)
  }
  return new winston.transports[name](config[name])
}

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
        createTransport(config, name)
    )
    .filter(transport => !!transport)
  debug('Creating logger with %d transports', transports.length)
  return winston.createLogger({ transports });
}

module.exports = createLogger
