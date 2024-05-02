/*eslint-disable*/
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
// Router for getting all blogs as JSON
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// Router for updating blog
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  }

  const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  })
  response.status(200)
  response.json(returnedBlog)
})

// Router for creating blog
//Defines attributes for a new blog post
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'title or url missing' })
  }
  if (body.user === undefined) {
    return response.status(400).json({ error: 'user missing' })
  }

  const savedBlog = await blog.save()
  user.blog = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

// Router for deleting blog
blogsRouter.delete('/:id', async (request, response) => {
  await blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
  if (request.params.id === undefined) {
    return response.status(400).json({ error: 'id missing' })
  }
})

module.exports = blogsRouter
