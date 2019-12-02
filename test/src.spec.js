'use strict'

const should = require('chai').should()

require('dotenv').config()

const createLogger = require('..')

const { PAPERTRAIL_HOST, PAPERTRAIL_PORT } = process.env

describe('Service logger', function() {
  it('should instantiate a single logger', function() {
    const config = { Console: { level: 'debug' } }
    const logger = createLogger(config)
    Object.keys(logger.transports).should.have.lengthOf(1)
  })

  it('should instantiate a logger with required prop', function() {
    const config = {
      Papertrail: { host: PAPERTRAIL_HOST, port: PAPERTRAIL_PORT }
    }
    const logger = createLogger(config)
    Object.keys(logger.transports).should.have.lengthOf(1)
  })

  it('should not instantiate a logger without required prop', function() {
    const config = { Papertrail: {} }
    const logger = createLogger(config)
    Object.keys(logger.transports).should.have.lengthOf(0)
  })

  it('should throw if the transport name is not supported', function() {
    const config = { WrongTransport: {} }
    should.throw(() => createLogger(config), 'Unsupported')
  })
})
