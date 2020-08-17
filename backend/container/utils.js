const { asClass, asValue } = require('awilix')
const { auth, password, TryCatch } = require('../utils')

module.exports = {
  auth: asClass(auth).singleton(),
  password: asClass(password).singleton(),
  TryCatch: asValue(TryCatch)
}
