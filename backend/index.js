const container = require('./container')

const database = container.resolve('database')
const server = container.resolve('server')
const logger = container.resolve('logger')

database.connect()
  .then(() => server.start())
  .catch(err => {
    logger.log(err.message)
    logger.log(err.stack)
    process.exit(0)
  })
