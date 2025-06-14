import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {votes: 0, content }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (anecdote) => {
  const updated = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updated)
  return response.data
}

export default {
  getAll,
  createNew,
  vote
}