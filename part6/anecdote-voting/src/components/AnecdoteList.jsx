import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if (filter === 'ALL' || filter === '') {
      return anecdotes.sort((a,b) => b.votes - a.votes)
    } else {
      return anecdotes.filter(anecdote => anecdote.content.includes(filter)).sort((a, b) => b.votes - a.votes)
    }
  })

  const vote = (id) => {
    dispatch(voteFor(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList