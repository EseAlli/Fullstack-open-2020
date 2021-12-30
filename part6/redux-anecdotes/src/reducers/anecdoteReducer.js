export const initializeAnecdotes = (notes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: notes,
  }
}

export const voteForAnecdote = (id) =>{
  return{
    type: 'VOTE',
    data: {id}
  }
}
export const createAnecdote = (data) =>{
  return{
    type: 'NEW_ANECDOTE',
    data
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