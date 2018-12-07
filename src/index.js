'use strict'

const debug = require('debug')('service-logger')
const winston = require('winston')

const supported = require('./transports')

Object.keys(supported).forEach(function(name) {
  try {
    supported[name].require(winston)
    debug(`Transport for ${name} loaded`)
  } catch (err) {
    debug(`Optional transport for ${name} not found`)
  }
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

  return new winston.Logger({ transports })
}

module.exports = createLogger
