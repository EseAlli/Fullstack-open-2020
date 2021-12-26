import React, {useState} from 'react'

const BlogForm = ({createBlog}) =>{
    const [title,setTitle] = useState("")
    const [url,setUrl] = useState("")
    const [author,setAuthor] = useState("")
    const [likes,setLikes] = useState(0)

    const addBlog = async (event) =>{
        event.preventDefault()
        createBlog({
            title,
            url,
            likes,
            author
        })
        setTitle("")
        setAuthor("")
        setUrl("")
    }
    return(
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
}

export default BlogForm