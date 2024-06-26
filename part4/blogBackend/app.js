/* eslint-disable global-require */
const express = require('express')

require('express-async-errors')
const mongoose = require('mongoose')

const app = express()
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
require('./controllers/tests')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler
} = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/tests')
  app.use('/api/testing', testRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
