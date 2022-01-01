import React, {useState} from 'react'
const Blog = ({ blog, updateBlog, deleteBlog}) => {
  const [visible,setVisible] =useState(false)
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
  <div style={blogStyle} className="blog">
        {blog.title} {blog.author}
        <button
          id="blog-view"
          onClick={toggleVisibility}
        >
          {visible ? 'hide' : 'show'}
        </button>
      { visible &&
        <div>
            <p>{blog.url}</p>
            <p>{blog.likes} <button onClick={ ()=> updateBlog(blog.id, blog.likes)} id="like">like</button></p>
            <p>{blog.user ? blog.user.name : ""}</p>
            <button onClick={ ()=> deleteBlog(blog)}>remove</button> 
        </div>
      }
  </div>  
)}
export default Blog