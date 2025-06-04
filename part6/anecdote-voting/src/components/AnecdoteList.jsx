import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const filteredAnecdotes = filter === 'ALL' || filter === ''
    ? anecdotes
    : anecdotes.filter(anecdote => anecdote.content.includes(filter))
    return [...filteredAnecdotes].sort((a,b) => b.votes - a.votes)
  })

  const vote = async (anecdote) => {
    dispatch(voteFor(anecdote))
    dispatch(showNotification(anecdote.content, 3000))
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