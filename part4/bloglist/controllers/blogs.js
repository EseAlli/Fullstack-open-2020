const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if(!body.title || !body.url){ 
    return response.status(400).json({error: "content is missing"})
  }
  else{
      const blog = new Blog(
        {
          title: body.title,
          likes: body.likes,
          url: body.url,
          author: body.author
        }
      )
      const savedBlog = await blog.save()
      response.json(savedBlog.toJSON())
  }
})



module.exports = blogsRouter