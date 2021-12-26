import React, {useState} from 'react'
const Blog = ({blog, updateBlog, deleteBlog}) => {
  const [visible,setVisible] =useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

 return (
  <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={ ()=> updateBlog(blog.id, blog.likes)}>like</button></p>
        <p>{blog.user ? blog.user.name : ""}</p>
        <button onClick={ ()=> deleteBlog(blog.id)}>remove</button>
     </div>
  </div>  
)}
export default Blog