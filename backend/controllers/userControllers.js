class UserController {
  constructor ({ userModel, password, auth, TryCatch }) {
    this._password = password
    this._userModel = userModel
    this._TryCatch = TryCatch
    this._auth = auth
  }

  getAll () {
    return this._userModel.getAll()
  }

  async validateEmails (user, update) {
    let invalidUser = null
    const cond = { email: user.email }
    invalidUser = await this._userModel.getOne(cond)
    if (invalidUser) {
      if (update && `${invalidUser._id}` === user._id) {
        return
      }
      throw new Error('emailDuplicate')
    }
  }

  validateRequire (user) {
    if (!user.name) throw new Error('nameRequired')
    if (!user.email) throw new Error('emailRequired')
    if (!user.password) throw new Error('passwordRequired')
  }

  async create (user) {
    return this._TryCatch(async () => {
      this.validateRequire(user)
      await this.validateEmails(user, false)
      user.password = this._password.generateHash(user.password)
      return this._userModel.create(user)
    })
  }

  async validateUpdatePassword (user) {
    if (!user.password) return
    if (user.password && !user.currentPassword) {
      throw new Error('currentPasswordRequired')
    } else {
      const result = await this._userModel.getOne({ _id: user._id })
      if (!this._password.compareHash(user.currentPassword, result.password)) {
        throw new Error('currentPasswordError')
      }
    }
  }

  async update (id, user) {
    return this._TryCatch(async () => {
      await this.validateEmails(user, true)
      await this.validateUpdatePassword(user)
      if (user.password) {
        user.password = this._password.generateHash(user.password)
      }
      return this._userModel.update(id, user)
    })
  }

  createToken ({ email, _id }) {
    const userToken = {
      email,
      _id
    }
    return this._auth.sing(userToken)
  }

  singIn (user) {
    return this._TryCatch(async () => {
      if (!user.email) throw new Error('nameRequired')
      if (!user.password) throw new Error('passwordRequired')
      const cond = {
        email: user.email
      }
      const resultFind = await this._userModel.getOne(cond)
      if (resultFind) {
        if (!this._password.compareHash(user.password, resultFind.password)) {
          throw new Error('passwordError')
        }
        const userReturn = resultFind.toJSON()
        delete userReturn.password
        userReturn.token = this.createToken(resultFind)
        return userReturn
      } else {
        throw new Error('emailNotRegister')
      }
    })
  }
}

module.exports = UserController
