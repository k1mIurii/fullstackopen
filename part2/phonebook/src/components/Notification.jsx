const Notification = ({ message, error }) => {
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