const { test, after, beforeEach, before } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)
let token = null
let user = null

before(async() => {
  const response = await api.post('/api/login').send({ username: 'qwerty', password: 'qwerty' })
  token = `Bearer ${response.body.token}`
  user = (await User.findOne({ username: 'qwerty' })).toJSON()
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsWithUser = helper.blogs.map(blog => ({
    ...blog,
    user: user.id, // ✅ assign only the user ID
  }))

  await Blog.insertMany(blogsWithUser)
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Correct amount of blogs', async () => {
  const response = await api.get('/api/blogs').set('Authorization', token)
  assert.strictEqual(response.body.length, helper.blogs.length)
})

test('Unique identifier', async () => {
  const response = await api.get('/api/blogs').set('Authorization', token);
  assert.ok(response.body[0].id);
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
    .set('Authorization', token)
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
    .set('Authorization', token)
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
    .set('Authorization', token)
    .expect(400)

  const blogsFromDB = await Blog.find({})
  console.log(blogsFromDB.length)
  assert.strictEqual(blogsFromDB.length, helper.blogs.length)
})

test('Delete by id', async () => {
  const blogsInDb = await helper.blogsFromDb()
  const toDelete = blogsInDb[0]

  const response = await api
    .delete(`/api/blogs/${toDelete.id}`)
    .set('Authorization', token)
    .expect(204)

  const blogsAtEnd = await helper.blogsFromDb()
  const titles = blogsAtEnd.map(n => n.title)

  assert(!titles.includes(toDelete.title))
  assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)
})

test('Update', async () => {
  const inital = await helper.blogsFromDb()
  const toUpdate = inital[0]

  const updated = {
    title: 'Title',
    author: 'Author',
    url: 'https://url.com',
    likes: 0,
    user: user.id
  }
  const response = await api
    .put(`/api/blogs/${toUpdate.id}`)
    .send(updated)
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  updated['id'] = toUpdate.id

  assert.deepStrictEqual(updated, response.body)
})

after(async () => {
  await mongoose.connection.close()
})