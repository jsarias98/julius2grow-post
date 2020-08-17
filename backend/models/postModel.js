const { Schema, model } = require('mongoose')
class PostModel {
  constructor () {
    this._postSchema = new Schema({
      title: {
        type: String,
        require: true
      },
      content: {
        type: String,
        require: true,
        unique: true
      },
      image: {
        type: String,
        require: true
      },
      user: { type: Schema.Types.ObjectId, ref: 'user' }
    }, { timestamps: {} })
    this._postModel = model('post', this._postSchema)
  }

  getOne (cond) {
    return this._postModel.findOne(cond).exec()
  }

  async create (post) {
    const postModel = this._postModel(post)
    const result = await postModel.save()
    return result
  }

  update (id, post) {
    return this._postModel.findOneAndUpdate({ _id: id }, post, { new: true })
  }

  delete (id) {
    return this._postModel.findByIdAndDelete(id)
  }
}

module.exports = PostModel
