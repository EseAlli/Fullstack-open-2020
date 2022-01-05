import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
export const setUser = () => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      return {
        type: 'SET_USER',
        data: user,
      }
    }
    return { type: 'LOGOUT_USER' }
}

export const logout = () => {
    window.localStorage.removeItem('blogUser')
    return { type: 'LOGOUT_USER', data: null }
  }

export const login = (loginObject) =>{
    return async dispatch =>{
        try{
            const user = await loginService.login(loginObject)
            window.localStorage.setItem('blogUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch({
                type: "LOGIN",
                data: user
            })
        }
        catch{
            dispatch(setNotification('Wrong credentials', 5))
        }
    }
} 

const reducer = (state = null, action) =>{
    switch(action.type){
        case "LOGIN":
            return action.data
        case 'SET_USER': 
            return action.data
        case 'LOGOUT': 
            return state     
        default:
            return state
    }
}

export default reducer