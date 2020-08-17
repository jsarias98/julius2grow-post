'use strict'

const { Router } = require('express')

module.exports = function ({ postControllers, authorizationMiddleware }) {
  const router = Router()

  router.get('/', authorizationMiddleware.authenticate.bind(authorizationMiddleware), async (req, res) => {
    const user = req.user._id
    const result = await postControllers.getOne(user)
    res.json(result)
  })
  router.post('/', authorizationMiddleware.authenticate.bind(authorizationMiddleware), async (req, res) => {
    const post = req.body
    post.user = req.user._id
    const result = await postControllers.create(post)
    res.json(result)
  })
  router.put('/:id', authorizationMiddleware.authenticate.bind(authorizationMiddleware), async (req, res) => {
    const { id } = req.params
    const post = req.body
    const result = await postControllers.update(id, post)
    console.log(result)
    res.json(result)
  })
  router.delete('/:id', authorizationMiddleware.authenticate.bind(authorizationMiddleware), async (req, res) => {
    const { id } = req.params
    const result = await postControllers.delete(id)
    res.json(result)
  })

  return router
}
