const { Schema, model } = require('mongoose')
class UserModel {
  constructor ({ password }) {
    this._password = password
    this._userSchema = new Schema({
      name: {
        type: String,
        require: true
      },
      email: {
        type: String,
        require: true,
        unique: true
      },
      password: {
        type: String,
        require: true
      },
      posts: [{ type: Schema.Types.ObjectId, ref: 'post' }]
    }, { timestamps: {} })
    this._userModel = model('user', this._userSchema)
  }

  getAll () {
    return this._userModel.find().populate('post').exec()
  }

  getOne (cond) {
    return this._userModel.findOne(cond).exec()
  }

  async create (user) {
    const userModel = this._userModel(user)
    const result = await userModel.save()
    return result
  }

  async update (id, user) {
    return this._userModel.findOneAndUpdate({ _id: id }, user, { new: true })
  }
}

module.exports = UserModel
