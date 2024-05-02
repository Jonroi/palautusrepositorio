/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

// delete old test data and create new test data
beforeEach(async () => {
  await blog.deleteMany({})
  await blog.insertMany(helper.initialBlogs, helper.initialUsers)
})

// DB connection tests
describe('Database connection', () => {
  test('Connection to the database is established', async () => {
    let response
    try {
      response = await api.get('/api/blogs')
    } catch (error) {
      assert.fail(`API request failed: ${error.message}`)
    }
    assert.ok(response, 'No response received from the database')
    assert.ok(Array.isArray(response.body), 'Response body should be an array')
    assert.ok(
      response.body.length >= 1,
      'Database should contain at least one blog entry'
    )
  })

  describe('Blog Content', () => {
    test('likes defaults to 0', async () => {
      const newBlog = {
        title: 'New Blog',
        author: 'John Doe',
        url: 'https://blogsies.com/new-blog'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there are three blogs', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, 3)
    })

    test('the first note is about React patterns', async () => {
      const response = await api.get('/api/blogs')
      const contents = response.body.map((e) => e.title)
      assert.strictEqual(contents[0], 'React patterns')
    })
  })

  // CRUD TESTS
  describe('CRUD operations', () => {
    test('Create a new blog and the count increases by one', async () => {
      const newBlog = {
        title: 'New Blog',
        author: 'John Doe',
        url: 'https://blogsies.com/new-blog',
        likes: 13
      }

      // get initial blog count
      const initialBlogsCount = (await api.get('/api/blogs')).body.length

      // Send POST request
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      // Makes sure that the response contains the new blog
      assert.strictEqual(response.body.title, newBlog.title)
      assert.strictEqual(response.body.author, newBlog.author)

      // Count the number of blogs  and compare it with the initial blog count
      const updatedBlogsCount = (await api.get('/api/blogs')).body.length
      assert.strictEqual(updatedBlogsCount, initialBlogsCount + 1)
    })

    test('Create a blog with missing title & url and fail with status code 400', async () => {
      const newBlog = {
        author: 'John Doe',
        likes: 13
      }
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.error, 'title or url missing')
    })

    test('Delete a blog and the count decreases by one', async () => {
      const blogsAtStart = (await api.get('/api/blogs')).body
      assert(blogsAtStart.length > 0, 'No blogs to delete')

      const blogToDelete = blogsAtStart[0]
      assert(blogToDelete.id, 'Blog ID is undefined')

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = (await api.get('/api/blogs')).body
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })

    test('Update a blog can be done with valid data', async () => {
      const blogs = await api.get('/api/blogs')
      const blogToUpdate = blogs.body[1]
      const updatedBlogData = {
        title: 'Updated Blog Title',
        author: 'Updated Author',
        url: 'https://updated.blog',
        likes: 42
      }

      // Send PUT request
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlogData)
        .expect(200)

      // check that the blog has been updated
      const updatedBlogs = await api.get('/api/blogs')
      const updatedBlog = updatedBlogs.body.find(
        (blog) => blog.id === blogToUpdate.id
      )

      assert.strictEqual(updatedBlog.title, updatedBlogData.title)
      assert.strictEqual(updatedBlog.author, updatedBlogData.author)
      assert.strictEqual(updatedBlog.url, updatedBlogData.url)
      assert.strictEqual(updatedBlog.likes, updatedBlogData.likes)
    })
  })

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'Jesonni', passwordHash })

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const newUser = {
        username: 'Perssoni',
        name: 'Pera Ponssoni',
        password: '1234'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.initialUsers

    const newUser = {
      username: 'Johnson',
      name: 'Joni Jonssoni',
      password: '1234'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.initialUsers

    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
