const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  return response.status(200).json(blogs)
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

blogsRouter.delete( '/:id', async(request, response) =>{
  const {id} = request.params
  const deletedBlog = await Blog.findByIdAndDelete(id)
  if (deletedBlog){
    return response.status(204)
  }
  else{
    return response.status(400).send("Could not Delete")
  }
})

blogsRouter.put('/:id', async(request, response)=>{
  const {id} = request.params
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true})
  return response.status(200).json(updatedBlog)
})

module.exports = blogsRouter