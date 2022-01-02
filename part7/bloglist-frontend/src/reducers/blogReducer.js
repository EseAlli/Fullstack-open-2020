import blogService from '../services/blogs'
export const intialBlog  =  () =>{
    return async dispatch =>{
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const likeBlog = (id, likes ) =>{
    return async dispatch =>{
        const likedBlog = {
            likes: likes + 1
        }
        await blogService.update(id, likedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: {
                id, 
                likes
            }
        })
    }
}

export const deleteBlog = (id) =>{
    return async dispatch =>{
        console.log(id)
        await blogService.deleteBlog({id})
        dispatch({
            type: 'DELETE_BLOG',
            data: {id}
        })
    }
}

const reducer = (state= [], action) =>{
    switch(action.type){
        case 'INIT_BLOGS':
            return action.data
        case 'LIKE_BLOG':
            return state.map((blog) =>
                blog.id === action.data.id
                ? { ...blog, likes: action.data.likes }
                : blog
            )
        case 'DELETE_BLOG':
            return state.filter((blog) => blog.id !== action.data.id)
        default:
            return state
    }
}

export default reducer