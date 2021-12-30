let time  = 0
export const setNotification = (notification) =>{
    if (time !== 0) {
        clearInterval(time)
    }
    return async (dispatch) => {
        dispatch({
          type: 'SET_NOTIFICATION',
          data: {notification}
        })
        time = setTimeout(() => {
          dispatch({
              type: 'SET_NOTIFICATION',
              data: {
                  notification: null
              }
          })
        }, 5000)
      }
}


const reducer = (state = null, action) =>{
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.data.notification
        default:
            return state
    }
}

export default reducer