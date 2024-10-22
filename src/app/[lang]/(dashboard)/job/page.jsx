'use client'

import { useEffect, useState } from 'react'

import Head from 'next/head'

import { useJobListMutation } from '../../../../lib/features/jobs/jobApi'

export default function Page() {
  const [jobs, setJobs] = useState([])

  // Mutation hook to fetch the job list
  const [jobList, { data, isLoading, isSuccess, isError, error }] = useJobListMutation()

  useEffect(() => {
    //request payload
    const resData = {
      resource: 'Job',
      action: 'ListJob',
      search: '',
      per_page: 10
    }

    jobList(resData)
  }, [jobList])

  // Handle successful data fetch
  useEffect(() => {
    if (isSuccess && data) {
      const result = data?.results?.data

      setJobs(result)
    }
  }, [isSuccess, data])

  return (
    <div>
      <Head>
        <title>ob List Page</title>
        <meta property='og:title' content='Job List Page' />
      </Head>
      <h1>Job List</h1>

      {isLoading && <p>Loading jobs...</p>}

      {isError && <p>Error loading jobs: {error?.message || 'Something went wrong'}</p>}

      {isSuccess && (
        <ul>{jobs.length > 0 ? jobs.map((job, index) => <li key={index}>{job.title}</li>) : <p>No jobs found.</p>}</ul>
      )}
    </div>
  )
}
