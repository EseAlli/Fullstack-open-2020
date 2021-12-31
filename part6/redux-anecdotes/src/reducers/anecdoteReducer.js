import anecdoteService from "../services/anecdotes"
export const initializeAnecdotes =() => {
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteForAnecdote = ({id, content, votes}) =>{
  return async dispatch =>{
  const changedAnecdote = {
      content,
      votes : votes + 1
  }
  const updatedAnecdote = await anecdoteService.updateOne(id, changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}
export const createAnecdote = (data) =>{
  return async dispatch =>{
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}
const reducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE': 
    const id = action.data.id
    const anecdoteToVoteFor = state.find(n => n.id === id)
    const changedAnecdote = {
      ...anecdoteToVoteFor,
      votes : anecdoteToVoteFor.votes + 1
    }
    return state.map(anecdote => 
      anecdote.id !== id ? anecdote : changedAnecdote  
    )
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer