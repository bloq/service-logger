# service-logger

Logging helper based on [Winston](https://github.com/winstonjs/winston) 3.x.

## Quick start

```js
const createLogger = require('@bloq/service-logger')

const logger = createLogger({
  Console: {
    level: 'debug'
  },
  Papertrail: {
    level: 'info',
    host: 'logs42.papertrailapp.com',
    port: '11666',
    program: 'awesome-service'
  }
})

logger.info('Logging to all transports!')
```

## Supported transports

- [`Winston`](https://github.com/winstonjs/winston) core transports
- [`Papertrail`](https://github.com/kenperkins/winston-papertrail)

These transports will be used only when installed along this module.
