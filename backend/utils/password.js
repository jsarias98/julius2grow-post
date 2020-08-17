'use strict'

const bcrypt = require('bcryptjs')

module.exports = class Password {
  constructor () {
    this._salt = bcrypt.genSaltSync(10)
  }

  generateHash (password) {
    return bcrypt.hashSync(password, this._salt)
  }

  compareHash (plainPassword, hashPassword) {
    return bcrypt.compareSync(plainPassword, hashPassword)
  }
}
