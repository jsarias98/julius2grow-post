const { asClass } = require('awilix')

const { Database } = require('../database')

module.exports = {
  database: asClass(Database).singleton()
}
