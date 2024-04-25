/* eslint-disable no-plusplus */
const _ = require('lodash')

const reverse = (string) => string.split('').reverse().join('')

const average = (array) => {
  const reducer = (sum, item) => sum + item
  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  // finds the first blog with the most likes
  let favorite = blogs[0]
  // checks the rest of the blogs
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = blogs[i]
    }
  }

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

function mostBlogs(blogs) {
  if (blogs.length === 0) {
    return null
  }

  // Count the number of blogs by each author
  const authorCounts = _.countBy(blogs, 'author')

  // Find the maximum count of blogs
  const maxCount = _.max(Object.values(authorCounts))

  // Get all authors with the maximum blog count
  const authorsWithMaxBlogs = _.chain(authorCounts)
    .toPairs() // convert object to [key, value] pairs
    // eslint-disable-next-line no-unused-vars
    .filter(([author, count]) => count === maxCount) // keep only those with maxCount
    .map(([author, count]) => ({ author, count })) // convert to array of objects
    .value()

  // If only one author has the most blogs, return them as an object, otherwise return an array
  return authorsWithMaxBlogs.length === 1
    ? authorsWithMaxBlogs[0]
    : authorsWithMaxBlogs
}

module.exports = {
  reverse,
  average,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
