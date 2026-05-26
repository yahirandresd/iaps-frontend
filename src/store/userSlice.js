import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isAuthenticated: false,
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
