import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteForAnecdote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter
    const anecdotes = state.anecdotes
    if (filter === '') return anecdotes

    return anecdotes.filter(
      (anecdote) =>
        anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1
    )
  })
    const dispatch = useDispatch()
    const vote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`))
      }
    return (
        <div>
            {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList
