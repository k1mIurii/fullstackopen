import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError(`Wrong credentials`)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }


  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blog).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const handleLike = (blog) => {
    blog.likes += 1
    blogService.update(blog)
      .then(returnedBlog => {
        setBlogs(prevBlogs =>
          prevBlogs.map(b =>
            b.id === returnedBlog.id ? {...b, likes: returnedBlog.likes} : b
          )
        )
      })
  }

  const handleRemove = (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}.`)) {
      blogService.deleteBlog(blog)
      .then(() =>
        setBlogs(prevBlogs => prevBlogs.filter(e => e.id !== blog.id))
      )
    }
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} error={error}/>
      {!user && loginForm()}
      {user &&
        <div>
          <h2>blogs</h2>
          <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
          {blogs.map(blog=>
            <Blog
              key={blog.id}
              blog={blog}
              onLike={handleLike}
              onRemove={handleRemove}
            />
          )}
        </div>

      }
    </div>
  )
}

export default App