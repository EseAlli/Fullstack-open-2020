import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from "./components/Notifications"
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import {useDispatch} from 'react-redux'
import {setNotification} from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(false)
  const dispatch = useDispatch()

  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'blogUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 3000)
    }
  }

  const addBlog = async (newBlog) =>{
    const created = await blogService.create(newBlog)
    if (created) {
      let {title, author} = created
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`A new blog ${title} by ${author} added`, 5))
      setBlogs(blogs.concat(created))
    }
  }

  const updateBlog = async (id, likes) =>{
    const updated = await blogService.update(id, { likes:likes+1})
    if (updated){
      setUpdate(true)
    }
  }

  const deleteBlog = async (blog) =>{
    const prompt = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if (prompt){
      await blogService.remove(blog.id)
      setUpdate(true)
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
    loginService.logout()
    setUser(null)
  }

  const blogForm = () => (
     <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
     </Togglable>
  )

  const blogList = () => (
    blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)) &&
      blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
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