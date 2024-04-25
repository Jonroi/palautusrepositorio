/*eslint-disable*/
const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

// Router for getting all blogs as JSON
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'title or url missing' })
  }
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

// Router for deleting blog
blogsRouter.delete('/:id', async (request, response) => {
  await blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
