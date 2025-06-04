import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage(state, action) {
      return null
    }
  }
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const showNotification = (message, duration = 5000) => {
  return async dispatch => {
    dispatch(setMessage(message))

    setTimeout(() => {
      dispatch(clearMessage())
    }, duration)
  }
}

export default notificationSlice.reducer