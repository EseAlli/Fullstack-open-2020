import React from "react";
const Notification = ({ successMessage, errorMessage }) => {
    if (successMessage === null || errorMessage === null) {
      return null
    }

    let style 
    let message
    if (successMessage){
        style = "success"
        message = successMessage
    }
    else if (errorMessage){
        style = "error"
        message = errorMessage
    }
 
    return (
        <div className={`${style}`}>
          {message}
        </div>
    )
   
}

export default Notification;