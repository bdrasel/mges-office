import { apiSlice } from '../apiSlice/apiSlice'

const jobApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    jobList: builder.mutation({
      query: data => ({
        url: '/resources',
        method: 'POST',
        body: data
      })
    })
  })
})

export const { useJobListMutation } = jobApi
