const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    console.log(exception)
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    console.log(exception)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
  }
})

blogRouter.put('/:id', async (request, response) => {
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
    console.log(exception)
  }
})

module.exports = blogRouter