const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {  
    await Blog.deleteMany({})  
    let blogObject = new Blog(helper.initialBlogs[0])  
    await blogObject.save()  
    blogObject = new Blog(helper.initialBlogs[1])  
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])  
    await blogObject.save()})


test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await Blog.find({})
    assert.notEqual(blogs[0].id,null)
  })

  test('new blogs are posted', async () => {

    const newBlog = {
      title: "This is a new blog",
      author: "Blogger Blogson",
      url: "http://www.blogosphere.bloggo",
      likes: 117094
    } 
  
    const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    totalBlogs = await helper.blogsInDb()
    
    assert.strictEqual(totalBlogs.length, helper.initialBlogs.length + 1)

    const contents = totalBlogs.map(n => n.title)
    assert(contents.includes("This is a new blog"))
    
})

test('likes default to 0', async () => {
  const newBlog = {
    title: "This is a new blog",
    author: "Blogger Blogson",
    url: "http://www.blogosphere.bloggo"
  } 

  const response = await api
  .post('/api/blogs')
  .send(newBlog)

  const totalBlogs = await helper.blogsInDb()

  const contents = totalBlogs[totalBlogs.length-1]
  assert(contents.likes == 0)

})

test('missing title', async () => {
  const newBlog = {
    author: "Blogger Blogson",
    url: "http://www.blogosphere.bloggo",
    likes: 4
  } 

  const response = await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

})

test('missing url', async () => {
  const newBlog = {
    title: "Blogggg",
    author: "Blogger Blogson",
    likes: 4
  } 

  const response = await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

})

after(async () => {
  await mongoose.connection.close()
})