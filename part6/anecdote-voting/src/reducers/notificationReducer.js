import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateMessage(state, action) {
      if (action.payload) {
        return `you voted for '${action.payload}'`
      }
    },
    clearMessage(state, action) {
       return null
    }
  }
})

export const { updateMessage } = notificationSlice.actions
export default notificationSlice.reducer