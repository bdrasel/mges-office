'use client'

import { useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'

import { useParams } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  IconButton,
  TableSortLabel,
  InputAdornment
} from '@mui/material'

import { Visibility, Edit, Delete, Search } from '@mui/icons-material'

import { useJobListMutation } from '../../lib/features/jobs/jobApi'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortField, setSortField] = useState('title')

  const [jobList, { data, isLoading, isSuccess, isError, error }] = useJobListMutation()
  const params = useParams()
  const { lang: locale } = params

  useEffect(() => {
    const resData = {
      resource: 'Job',
      action: 'ListJob',
      search: searchTerm,
      per_page: perPage,
      page: page,
      sort_by: sortField,
      sort_order: sortOrder
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

  const handleSort = field => {
    const isAsc = sortField === field && sortOrder === 'asc'

    setSortOrder(isAsc ? 'desc' : 'asc')
    setSortField(field)
  }

  return (
    <div>
      <Head>
        <title>Job List Page</title>
        <meta property='og:title' content='Job List Page' />
      </Head>

      <Box my={4} mx={2}>
        <Typography variant='h4' gutterBottom align='center' color='primary'>
          Available Job Listings
        </Typography>

        {/* Enhanced Search Bar */}
        <Box mb={3} display='flex' justifyContent='center'>
          <TextField
            label='Search Jobs'
            variant='outlined'
            fullWidth
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              )
            }}
            sx={{ maxWidth: 600 }}
          />
        </Box>

        {/* Loading and Error States */}
        {isLoading && (
          <Box display='flex' justifyContent='center' my={3}>
            <CircularProgress />
          </Box>
        )}

        {isError && <Alert severity='error'>{error?.message || 'Error loading jobs'}</Alert>}

        {isSuccess && jobs.length === 0 && (
          <Typography align='center' variant='h6'>
            No jobs found.
          </Typography>
        )}

        {/* Job Table */}
        {isSuccess && jobs.length > 0 && (
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell>
                    <Typography color='white'>SL</Typography>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortField === 'title'}
                      direction={sortOrder}
                      onClick={() => handleSort('title')}
                      sx={{ color: 'white' }}
                    >
                      Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortField === 'location'}
                      direction={sortOrder}
                      onClick={() => handleSort('location')}
                      sx={{ color: 'white' }}
                    >
                      Location
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortField === 'level'}
                      direction={sortOrder}
                      onClick={() => handleSort('level')}
                      sx={{ color: 'white' }}
                    >
                      Level
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortField === 'employement_type'}
                      direction={sortOrder}
                      onClick={() => handleSort('employement_type')}
                      sx={{ color: 'white' }}
                    >
                      Employment Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortField === 'offered_salary'}
                      direction={sortOrder}
                      onClick={() => handleSort('offered_salary')}
                      sx={{ color: 'white' }}
                    >
                      Salary
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job, index) => (
                  <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                    <TableCell>{(page - 1) * perPage + index + 1}</TableCell> {/* Serial Number */}
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.level}</TableCell>
                    <TableCell>{job.employement_type}</TableCell>
                    <TableCell>{job.offered_salary || 'Not specified'}</TableCell>
                    <TableCell align='center'>
                      <Link href={`/${locale}/job/${job.id}`} passHref>
                        <IconButton color='primary'>
                          <Visibility />
                        </IconButton>
                      </Link>
                      <IconButton color='secondary'>
                        <Edit />
                      </IconButton>
                      <IconButton color='error'>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        {isSuccess && jobs.length > 0 && (
          <Box mt={4} display='flex' justifyContent='center'>
            <Pagination
              count={Math.ceil(data?.results?.total / perPage)}
              page={page}
              onChange={handlePageChange}
              color='primary'
              variant='outlined'
              shape='rounded'
            />
          </Box>
        )}
      </Box>
    </div>
  )
}
