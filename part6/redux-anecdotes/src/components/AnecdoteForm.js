import React from 'react';
import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newAnecdote = async (event) =>{
        event.preventDefault()
        const content = event.target.ancedote.value
        event.target.ancedote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification(`you created '${content}'`))
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
