'use strict'

const { Router } = require('express')

module.exports = function ({ userControllers, authorizationMiddleware }) {
  const router = Router()

  router.post('/', async (req, res) => {
    const user = req.body
    const result = await userControllers.create(user)
    console.log(result)
    res.json(result)
  })
  router.post('/singin', async (req, res) => {
    const user = req.body
    const result = await userControllers.singIn(user)
    console.log(result)
    res.json(result)
  })
  router.put('/', authorizationMiddleware.authenticate.bind(authorizationMiddleware), async (req, res) => {
    const id = req.user._id
    const user = req.body
    const result = await userControllers.update(id, user)
    console.log(result)
    res.json(result)
  })

  return router
}
