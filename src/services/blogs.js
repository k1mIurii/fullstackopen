import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async object => {
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const response = await axios.put(`${baseUrl}/${object.id}`, object, config)
  return response.data
}

const deleteBlog = async object => {
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const response = await axios.delete(`${baseUrl}/${object.id}`, config)
  return response.data
}

export default { setToken, getAll, create, update, deleteBlog }