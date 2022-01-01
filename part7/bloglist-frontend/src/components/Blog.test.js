import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'


describe('<Blog />', () => {
  let blog = {
    title: 'Testing React Apps',
    author: 'Ese Alli',
    url: 'https://react.com/test',
    likes: 12,
    user: '606f2ec415917a37c0b3732f',
  }


  const component = render(
    <Blog blog={blog} />
  )

  test('the component is displays just blog title and author', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.likes)
    expect(component.container).not.toHaveTextContent(blog.url)
  })

  test('url and number of likes are shown when the button controlling the shown details has been clicked', () =>{
    const component = render(
        <Blog blog={blog} />
      )
    const button = component.getByText('show')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.url)
  })

  test ('if the like button is clicked twice, the event handler the component received as props is called twice', ()=>{
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog}  updateBlog={mockHandler}/>
    )

    const button = component.getByText('show')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
    })

    test('<BlogForm /> creates a new blog', () => {
        const createBlog = jest.fn()
      
        const component = render(
          <BlogForm createBlog={createBlog} />
        )
      
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector("#url")
        const title = component.container.querySelector("#title")
        const form = component.container.querySelector('form')
      
        fireEvent.change(title, { 
          target: { value: 'testing of forms could be easier' } 
        })
        fireEvent.change(author, {
            target:{value: 'Ese Alli'}
        })
        fireEvent.change(url, {
            target: {value: "https://react.com/test-form"}
        })
        fireEvent.submit(form)
      
        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
      })
})