import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      // const token = getState()?.auth?.accessToken
      const auth = JSON.parse(localStorage.getItem('auth'))

      if (auth?.accessToken) {
        headers.set('Authorization', `Bearer ${auth?.accessToken}`)
      }

      console.log('token', auth?.accessToken)

      return headers
    }
  }),
  tagTypes: [],
  endpoints: builder => ({})
})
