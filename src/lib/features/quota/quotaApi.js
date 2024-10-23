import { apiSlice } from '../apiSlice/apiSlice'

const quotaApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    quotaList: builder.query({
      query: (data) => ({
        url: '/resources',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useQuotaListQuery } = quotaApi
