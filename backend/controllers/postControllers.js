class PostController {
  constructor ({ postModel, TryCatch, userModel }) {
    this._postModel = postModel
    this._userModel = userModel
    this._TryCatch = TryCatch
  }

  getOne (user) {
    const cond = {
      user: user
    }
    return this._postModel.getOne(cond)
  }

  async validatePost (post) {
    if (!post.title) throw new Error('titleRequired')
    if (!post.content) throw new Error('contentRequired')
    if (!post.image) throw new Error('imageRequired')
    if (!post.user) throw new Error('userRequired')
    const user = await this._userModel.getOne({ _id: post.user })
    if (!user) throw new Error('userNotRegister')
  }

  async create (post) {
    return this._TryCatch(async () => {
      this.validatePost(post)
      return this._postModel.create(post)
    })
  }

  async update (id, post) {
    return this._TryCatch(async () => {
      return this._postModel.update(id, post)
    })
  }

  delete (id) {
    return this._TryCatch(() => {
      return this._postModel.delete(id)
    })
  }
}

module.exports = PostController
