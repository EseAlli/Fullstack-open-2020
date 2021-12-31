import React from 'react';
import { connect } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const newAnecdote = async (event) =>{
        event.preventDefault()
        const content = event.target.ancedote.value
        event.target.ancedote.value = ''
        props.createAnecdote(content)
        props.setNotification(`you created '${content}'`, 5)
      }
    return (
        <div>
           <h2>create new</h2>
           <form onSubmit={newAnecdote}>
                <div><input name="ancedote" /></div>
                <button>create</button>
            </form> 
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
