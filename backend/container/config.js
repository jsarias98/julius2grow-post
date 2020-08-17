const { asValue, asClass } = require('awilix')
const config = require('../config/environments')
const Server = require('../api/server')
const Logger = require('../logger')

module.exports = {
  config: asValue(config),
  server: asClass(Server).singleton(),
  logger: asClass(Logger).singleton()
}
