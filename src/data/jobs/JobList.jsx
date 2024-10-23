'use client'

import { useEffect, useState } from 'react'

import { Table, TableBody, TableContainer, Paper, Typography, Box, Alert } from '@mui/material'

import { SearchComponent, PaginationComponent, LoadingComponent, NotFoundComponent } from '../../components/index'

import { useJobListMutation } from '../../lib/features/jobs/jobApi'

import JobItem from './JobItem'
import JobHead from './JobHead'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortField, setSortField] = useState('title')

  const [jobList, { data, isLoading, isSuccess, isError, error }] = useJobListMutation()

  useEffect(() => {
    const resData = {
      resource: 'Job',
      action: 'ListJob',
      search: searchTerm,
      per_page: perPage,
      page: page
    }

    jobList(resData)
  }, [jobList, page, perPage, searchTerm, sortField, sortOrder])

  useEffect(() => {
    if (isSuccess && data) {
      setJobs(data?.results?.data)
    }
  }, [isSuccess, data])

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  return (
    <div>
      <Box my={4} mx={2}>
        <Typography variant='h4' gutterBottom align='center' color='primary'>
          Available Job Listings
        </Typography>

        {/* Search Bar */}
        <Box mb={3} display='flex' justifyContent='center'>
          <SearchComponent
            label='Search Jobs'
            handleSearchTerm={e => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </Box>

        {isError && <Alert severity='error'>{error?.message || 'Error loading jobs'}</Alert>}

        {isSuccess && jobs.length === 0 && <NotFoundComponent title='No jobs found.' />}

        {/* Job Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 1, boxShadow: 3 }}>
          <Table>
            <JobHead />

            {/* Loading */}
            {isLoading && <LoadingComponent />}

            {isSuccess && jobs.length > 0 && (
              <TableBody>
                {jobs.map((job, index) => (
                  <JobItem index={index} key={job.id} job={job} page={index} perPage={index} />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>

        {/* Pagination */}
        {isSuccess && jobs.length > 0 && (
          <PaginationComponent
            count={Math.ceil(data?.results?.total / perPage)}
            page={page}
            handleOnChange={handlePageChange}
          />
        )}
      </Box>
    </div>
  )
}
