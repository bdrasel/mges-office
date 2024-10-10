import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: undefined,
  message: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.message = action.payload.message
    },
    userLoggedOut: state => {
      state.accessToken = undefined
      state.message = ''
    }
  }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export default authSlice.reducer
