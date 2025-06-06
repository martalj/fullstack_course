const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require ('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
      response.json(blogs)
  })
  
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const {user} = request
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title, 
    author: body.author, 
    url: body.url, 
    likes: body.likes, 
    user: user.id}
  )

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const {user} = request
  
  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
  }
  else{
    response.status(401).json({ error: 'unauthorized access' })
  }


})

blogsRouter.put('/:id', async (request, response) => {
  const {title, author, url, likes} = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog || !title || !url) {
    return response.status(400).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog)
  
})



module.exports = blogsRouter