const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }

    const user = request.user

    if (blog.user._id.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    }
    response.status(404).end()

  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  try {
    const current = await Blog.findById(request.params.id)
    if (!current) {
      return response.status(404).end()
    }

    current.title = body.title
    current.author = body.author
    current.url = body.url
    current.likes = body.likes

    const updated = await current.save()
    response.status(200).json(updated)

  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter