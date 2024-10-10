import { apiSlice } from '../apiSlice/apiSlice'
import { userLoggedIn, userLoggedOut } from './authApiSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: '/register',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
        } catch (err) {}
      }
    }),

    login: builder.mutation({
      query: data => ({
        url: '/resources',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled

          if (result.data.success === false) {
            return
          }

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: result.data.results.access_token,
              message: result.data.message
            })
          )

          dispatch(
            userLoggedIn(
              JSON.stringify({
                accessToken: result.data.results.access_token,
                message: result.data.message
              })
            )
          )
        } catch (err) {}
      }
    }),

    logout: builder.mutation({
      query: data => ({
        url: '/resources',
        method: 'POST',
        body: data
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled

          if (result.data.success === false) {
            return
          }

          localStorage.clear()
        } catch (err) {}
      }
    })
  })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi
