'use strict'

const { asClass } = require('awilix')
const { AuthorizationMiddleware } = require('../api/middlewares')

module.exports = {
  authorizationMiddleware: asClass(AuthorizationMiddleware).singleton()
}
