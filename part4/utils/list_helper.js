const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length <= 0 ? 0 : blogs.map(blog => blog.likes).reduce((sum, current) => sum + current, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((top, current) =>
    current.likes > top.likes ? current : top
  );
}

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  let maxAuthor = null
  let maxCount = 0

  for (const [author, blogs] of Object.entries(grouped)) {
    if (blogs.length > maxCount) {
      maxAuthor = author
      maxCount = blogs.length
    }
  }

  return {
    author: maxAuthor,
    blogs: maxCount
  }
}

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  let maxLikesAuthor = null
  let maxLikes = 0

  for (const key in grouped) {
    let likes = grouped[key].map(blog => blog.likes).reduce((sum, current) => sum + current, 0)
    if (likes > maxLikes) {
      maxLikesAuthor = key
      maxLikes = likes
    }
  }

  return {
    author: maxLikesAuthor,
    likes: maxLikes
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}