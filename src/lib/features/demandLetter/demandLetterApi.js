import { apiSlice } from '../apiSlice/apiSlice'

const demandLetterApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    demandLetterList: builder.mutation({
      query: data => ({
        url: '/resources',
        method: 'POST',
        body: data
      })
    })
  })
})

export const { useDemandLetterListMutation } = demandLetterApi
