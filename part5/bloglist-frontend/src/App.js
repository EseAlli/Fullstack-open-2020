import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from "./components/Notifications"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title,setTitle] = useState("")
  const [url,setUrl] = useState("")
  const [author,setAuthor] = useState("")
  const [likes,setLikes] = useState(0)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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

  const addBlog = async (event) =>{
      event.preventDefault()
      const newBlog = {
        url,
        author,
        title,
        likes
      }
    const created = await blogService.create(newBlog)
    console.log(created)
    if (created) {
      let {title, author} = created
      setSuccessMessage(`A new blog ${title} by author added`)
      setTimeout(()=>{
          setSuccessMessage(null)
      }, 3000)
      setTitle("")
      setAuthor("")
      setUrl("")
      setBlogs(blogs.concat(created))
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
      <button type="submit">login</button>
    </form>      
  )

  const logOut = () =>{
    loginService.logout()
    setUser(null)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          value={title}
          onChange={({target})=> setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={({target})=> setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
  
      <button type="submit">create</button>
    </form>  
  )

  const blogList = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
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