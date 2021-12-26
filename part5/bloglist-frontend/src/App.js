import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from "./components/Notifications"
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(false)

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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const addBlog = async (newBlog) =>{
    const created = await blogService.create(newBlog)
    if (created) {
      let {title, author} = created
      setSuccessMessage(`A new blog ${title} by ${author} added`)
      setTimeout(()=>{
          setSuccessMessage(null)
      }, 3000)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(created))
    }
  }

  const updateBlog = async (id, likes) =>{
    const updated = await blogService.update(id, { likes:likes+1})
    if (updated){
      setUpdate(true)
    }
  }

  const deleteBlog = async (id) =>{
    await blogService.remove(id)
    setUpdate(true)
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
      <button type="submit">login</button>
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
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>
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