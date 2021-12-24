const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')



blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  return response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token
  const user = request.user

  if (!token || !user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if(!body.title || !body.url){ 
    return response.status(400).json({error: "content is missing"})
  }
  else{
      const blog = new Blog(
        {
          title: body.title,
          likes: body.likes,
          url: body.url,
          author: body.author,
          user: user._id
        }
      )
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await User.findByIdAndUpdate(user.id, user)
      response.json(savedBlog.toJSON())
  }
})

blogsRouter.delete( '/:id', async(request, response) =>{
  const {id} = request.params
  const token = request.token
  const user = request.user
  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(id)
  if(blog.user.toString() === user.id){
		await Blog.findByIdAndDelete(id)
		response.status(204).end()
	}
	else{
		return response.status(401).json({
			error: "Unauthorized"
		})
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