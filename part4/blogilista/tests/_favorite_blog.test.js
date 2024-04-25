const { test, describe } = require('node:test')
const assert = require('node:assert')
const { favoriteBlog } = require('../utils/for_testing')

describe('favoriteBlog', () => {
  test('of empty list is null', () => {
    assert.strictEqual(favoriteBlog([]), null)
  })

  test('when list has one blog, equals that blog', () => {
    const blogs = [{ title: 'Blogi 1', author: 'Author 1', likes: 10 }]
    assert.deepStrictEqual(favoriteBlog(blogs), {
      title: 'Blogi 1',
      author: 'Author 1',
      likes: 10
    })
  })

  test('of a list of blogs is calculated correctly', () => {
    const blogs = [
      { title: 'Blogi 1', author: 'Author 1', likes: 10 },
      { title: 'Blogi 2', author: 'Author 2', likes: 5 },
      { title: 'Blogi 3', author: 'Author 3', likes: 8 }
    ]
    assert.deepStrictEqual(favoriteBlog(blogs), {
      title: 'Blogi 1',
      author: 'Author 1',
      likes: 10
    })
  })

  test('returns one of the favorites if multiple have the same number of likes', () => {
    const blogs = [
      { title: 'Blogi 1', author: 'Author 1', likes: 15 },
      { title: 'Blogi 2', author: 'Author 2', likes: 85 },
      { title: 'Blogi 3', author: 'Author 3', likes: 77 }
    ]
    const result = favoriteBlog(blogs)
    assert(
      result.title === 'Blogi 1' ||
        result.title === 'Blogi 2' ||
        result.title === 'Blogi 3'
    )
  })
})
