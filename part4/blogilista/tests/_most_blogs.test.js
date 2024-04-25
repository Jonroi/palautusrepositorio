const { test, describe } = require('node:test')
const assert = require('assert')
const { mostBlogs } = require('../utils/for_testing')

describe('mostBlogs', () => {
  test('should return null when the input array is empty', () => {
    const result = mostBlogs([])
    assert.strictEqual(result, null)
  })

  test('should return the author with the most blogs and the count', () => {
    const blogs = [
      { author: 'Author1', title: 'Blog 1' },
      { author: 'Author2', title: 'Blog 2' },
      { author: 'Author1', title: 'Blog 3' },
      { author: 'Author3', title: 'Blog 4' },
      { author: 'Author1', title: 'Blog 5' },
      { author: 'Author2', title: 'Blog 6' },
      { author: 'Author2', title: 'Blog 7' },
      { author: 'Author1', title: 'Blog 8' }
    ]
    const result = mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Author1', count: 4 })
  })

  test('should return authors with the same highest blog count', () => {
    const blogs = [
      { author: 'Author1', title: 'Blog 1' },
      { author: 'Author2', title: 'Blog 2' },
      { author: 'Author1', title: 'Blog 3' },
      { author: 'Author3', title: 'Blog 4' },
      { author: 'Author2', title: 'Blog 5' },
      { author: 'Author2', title: 'Blog 6' },
      { author: 'Author1', title: 'Blog 7' },
      { author: 'Author3', title: 'Blog 8' }
    ]
    const result = mostBlogs(blogs)

    const expected = [
      { author: 'Author1', count: 3 },
      { author: 'Author2', count: 3 }
    ]

    assert.deepStrictEqual(result, expected)
  })
})
