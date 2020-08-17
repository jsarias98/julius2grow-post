const { asClass } = require('awilix')

const { UserModel, PostModel } = require('../models')

module.exports = {
  userModel: asClass(UserModel).singleton(),
  postModel: asClass(PostModel).singleton()
}
