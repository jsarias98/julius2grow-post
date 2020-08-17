const { asFunction } = require('awilix')
const { Routes, UserRoutes, PostRoutes } = require('../api/routes')

module.exports = {
  routes: asFunction(Routes).singleton(),
  userRoutes: asFunction(UserRoutes).singleton(),
  postRoutes: asFunction(PostRoutes).singleton()
}
