import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Notification = () => {
  const notification = useSelector(state => {
    return state.notification
  })

  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'notification/clearMessage' })
    }, 5000)
    return () => clearTimeout(timer)
  }, [notification, dispatch])


  if (notification === null) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification