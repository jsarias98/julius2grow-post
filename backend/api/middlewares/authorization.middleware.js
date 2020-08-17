'use strict'

class AuthorizationMiddleware {
  constructor ({ auth }) {
    this._authentication = auth
  }

  getToken ({ req, res }) {
    return req.headers.authorization || req.headers['x-access-token']
  }

  isToken ({ res, token }) {
    if (!token) {
      res.json({
        err: {
          message: 'authorization_token_required'
        }
      })
    }
    return true
  }

  authenticate (req, res, next) {
    const token = this.getToken({ req })
    if (this.isToken({ res, token })) {
      this._authentication.verify({ token: token.replace('Bearer ', '') }, (err, user) => {
        if (err) {
          return res.json({
            err: {
              message: err.message
            }
          })
        }
        req.user = user
        next()
      })
    }
  }
}

module.exports = AuthorizationMiddleware
