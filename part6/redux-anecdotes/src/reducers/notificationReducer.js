export const clearNotification = () =>{
    return{
        type: 'CLEAR_NOTIFICATION',
        data: null
    }
}

export const setNotification = (notification, sec) =>{
    return async (dispatch) => {
        dispatch({
          type: 'SET_NOTIFICATION',
          data: {notification}
        })
        setTimeout(() => {
          dispatch(clearNotification())
        },sec * 1000)
      }
}




const reducer = (state = null, action) =>{
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.data.notification
        case 'CLEAR_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export default reducer