const Notification = ({ message, error }) => {
  console.log('message',message)
  console.log('error',error)
  if (message === null && error === null) {
    return null
  }

  if (message) {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    )
  }
}

export default Notification