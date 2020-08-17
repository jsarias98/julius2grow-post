'use strict'

const { Router, urlencoded, json } = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

module.exports = function ({ userRoutes, postRoutes }) {
  const router = Router()
  const apiRouter = Router()

  apiRouter
    .use(cors())
    .use(helmet())
    .use(urlencoded({ extended: false }))
    .use(json())
    .use(compression())

  apiRouter.use('/users', userRoutes)
  apiRouter.use('/posts', postRoutes)

  router.use('/api', apiRouter)

  return router
}
