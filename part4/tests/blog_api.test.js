const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.blogs.length)
})

test('Unique identifier', async () => {
  assert(helper.blogs[0].hasOwnProperty('id'))
})

test('Successfull creation of new blog', async () => {
  const newBlog = {
    title: "Who killed Mark?",
    author: "Oxxxymiron",
    url: "vk.com",
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await Blog.find({})
  assert.strictEqual(blogs.length, helper.blogs.length + 1)
})

test('Like property is missing, default was used', async () => {
  const newBlog = {
    title: "Who killed Mark?",
    author: "Oxxymiron",
    url: "vk.com"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('Missing title or url produces 400', async () => {
  const newBlog = {
    title: "Who killed Mark?",
    author: "Oxxxymiron",
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsFromDB = await Blog.find({})
  console.log(blogsFromDB.length)
  assert.strictEqual(blogsFromDB.length, helper.blogs.length)
})

after(async () => {
  await mongoose.connection.close()
})