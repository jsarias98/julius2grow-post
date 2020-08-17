'use strict'
const jwt = require('jsonwebtoken')

module.exports = class Auth {
  constructor ({ config }) {
    this._secret = config.auth.secret
    this._expire = config.auth.timeExpire
  }

  sing (payload) {
    return jwt.sign(payload, this._secret, { expiresIn: this._expire })
  }

  // verify (token) {
  //   return jwt.verify(token, this._secret, (err, decoded) => {
  //     if (err) {
  //       throw new Error(err.message)
  //     } else {
  //       return decoded
  //     }
  //   })
  // }
  verify ({ token }, cb) {
    return jwt.verify(token, this._secret, cb)
  }
}
