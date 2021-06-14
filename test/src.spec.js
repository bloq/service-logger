'use strict'

require('chai').should()

const createLogger = require('..')

describe('Service logger', function () {
  it('should instantiate a single Console logger', function () {
    const logger = createLogger()
    Object.keys(logger.transports).should.have.lengthOf(1)
  })

  it('should instantiate an optional logger', function () {
    const config = {
      Papertrail: { host: 'test.papertrailapp.com', port: '7327' }
    }
    const logger = createLogger(config)
    Object.keys(logger.transports).should.have.lengthOf(2)
  })
})
