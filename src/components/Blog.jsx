import { useState } from 'react'

const Blog = ({ blog, onLike, onRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          { visible ? 'hide' : 'view' }
        </button>
      </div>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div>
            Likes {blog.likes}
            <button onClick={() => onLike(blog)}>like</button>
          </div>
          <div>{blog.user?.username || 'unknown user'}</div>
          <button style={{
              backgroundColor: 'blue'
            }}
            onClick={() => onRemove(blog)}
          >
            remove
          </button>
        </>
      )}
    </div>
  )
}


export default Blog