'use strict'

const winston = require('winston')

/**
 * Create a logger.
 *
 * @param {object} [config] The logger configuration.
 * @returns {winston.Logger} A Winston logger instance.
 */
const createLogger = function (config = {}) {
  const transports = []

  transports.push(
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true,
      ...config.Console
    })
  )

  if (config.Papertrail && config.Papertrail.host) {
    const { PapertrailTransport } = require('winston-papertrail-transport')
    transports.push(
      new PapertrailTransport({
        handleExceptions: true,
        ...config.Papertrail
      })
    )
  }

  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.colorize(),
      winston.format.simple()
    ),
    transports
  })

  // Force libraries like `debug` that output to stderr to log through Winston.
  if (!config.dontCaptureStderr) {
    const _write = process.stderr.write.bind(process.stderr)
    process.stderr.write = function (message, ...rest) {
      logger.debug(message.trim())
      return _write('', ...rest)
    }
  }

  return logger
}

module.exports = createLogger
