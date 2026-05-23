import { createSlice } from '@reduxjs/toolkit'
import { getSession } from '../services/securityService'

const stored = getSession()

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: stored,
    isAuthenticated: !!stored,
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload
      state.isAuthenticated = true
    },
    clearUser(state) {
      state.data = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export const selectUser = (state) => state.user.data
export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export default userSlice.reducer
