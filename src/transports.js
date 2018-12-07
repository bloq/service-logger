'use strict'

module.exports = {
  Papertrail: {
    require() {
      require('winston-papertrail')
    },
    prop: 'host'
  },
  Sentry: {
    require() {
      require('winston-sentry-transport')
    },
    prop: 'dns'
  },
  Slack: {
    require(winston) {
      winston.transports.Slack = require('slack-winston').Slack
    },
    prop: 'webhook_url'
  }
}
