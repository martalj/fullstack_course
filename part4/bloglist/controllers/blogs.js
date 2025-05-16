const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require ('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
      response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token invalid'})
  }

  const fullUser = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title, 
    author: body.author, 
    url: body.url, 
    likes: body.likes, 
    user: fullUser.id}
  )

  const savedBlog = await blog.save()
  fullUser.blogs = fullUser.blogs.concat(savedBlog._id)
  await fullUser.save()

  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
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