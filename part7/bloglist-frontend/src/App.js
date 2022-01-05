import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notifications"
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import {useDispatch, useSelector} from 'react-redux'
import { intialBlog, likeBlog, deleteBlog, createBlog } from './reducers/blogReducer'
import {login, setUser, logout} from './reducers/userReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const blogFormRef = useRef()
  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(intialBlog()) 
  }, [dispatch])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    const user = { username, password}
    dispatch(login(user))
    setUsername('')
    setPassword('')
  }

  const addBlog = async (newBlog) =>{
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
  }

  const updateBlog = async (id, likes) =>{
    dispatch(likeBlog(id, likes))
  }

  const deleteABlog = async (blog) =>{
    const prompt = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if (prompt){
      dispatch(deleteBlog(blog.id))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>      
  )

  const logOut = () =>{
    dispatch(logout())
  }

  const blogForm = () => (
     <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
     </Togglable>
  )

  const blogList = () => (
    blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)) &&
      blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteABlog}/>
      ))
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in <button onClick={logOut}>logout</button></p>
        {blogForm()}
      </div>
    }
      {
        user !== null ? blogList() : '' 
      }
      
    </div>
  )
}

export default App