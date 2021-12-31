import React from 'react';
import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newAnecdote = async (event) =>{
        event.preventDefault()
        const content = event.target.ancedote.value
        event.target.ancedote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you created '${content}'`, 5))
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

export default AnecdoteForm