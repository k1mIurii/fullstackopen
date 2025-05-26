const Blog = require('../models/blog')
const User = require('../models/user')

const blogs = [
  {
    "title": "Why not?",
    "author": "Iurii Kim",
    "url": "x.com",
    "likes": 0,
    "id": "6832751c63a8d5cf7af67298"
  },
  {
    "title": "To be or not to be?",
    "author": "Shakespeare",
    "url": "twitter.com",
    "likes": 1,
    "id": "683340d6599fa919c23ca2ef"
  }
]

const blogsFromDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  blogs,
  blogsFromDb,
  usersInDb
}