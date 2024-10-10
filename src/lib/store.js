import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './features/apiSlice/apiSlice'
import authReducer from './features/auth/authApiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  devTools: !process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddlewares => getDefaultMiddlewares().concat(apiSlice.middleware)
})
