import { apiSlice } from '../apiSlice/apiSlice'

const preDemandLetterApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    preDemandLetterList: builder.mutation({
      query: data => ({
        url: '/resources',
        method: 'POST',
        body: data
      })
    })
  })
})

export const { useDemandLetterListMutation } = preDemandLetterApi
