const app = require("../app")
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')

test('blogs are retured in json format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')  
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    let response = await api.get('/api/blogs')
    const newBlog = {
      title: "New Blog ",
      author: "James Author",
      url: "http://localhost/api/blog/9",
      likes: 22
    }
    const blog_length = response.body.length
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    response = await api.get('/api/blogs')
    
    const contents = response.body.map(content => content.title)
    
    expect(response.body).toHaveLength(blog_length + 1)
    expect(contents).toContain(
      'New Blog'
    )
  })
  
  test('like is missing then set to zero', async () => {
      const newBlog = {
          title: "Another Blog Post 1",
          author: "King Author",
          url: "http://localhost/api/blog/10"
      }
  
      const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      expect(response.body.likes).toBe(0)
  })
  
  test("/api/blogs requires title and url in the body", async () => {
      const newBlog = {
          author: "John Doe",
          likes: 50
      }
      const response = await api
          .post("/api/blogs")
          .send(newBlog)
          .expect(400)
          .expect('Content-Type', /application\/json/)
  })
  
  afterAll(() => {
      mongoose.connection.close()
   })