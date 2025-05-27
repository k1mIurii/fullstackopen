import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(blog)
  }

  const handleBlogChange = ({ target }) => {
    setBlog(prevBlog => ({
      ...prevBlog,
      [target.name]: target.value
    }))
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={blog.title}
            name='title'
            onChange={handleBlogChange}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={blog.author}
            name='author'
            onChange={handleBlogChange}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={blog.url}
            name='url'
            onChange={handleBlogChange}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

}

export default BlogForm