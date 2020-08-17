const { asClass } = require('awilix')
const { UserControllers, PostControllers } = require('../controllers')

module.exports = {
  userControllers: asClass(UserControllers).singleton(),
  postControllers: asClass(PostControllers).singleton()
}
