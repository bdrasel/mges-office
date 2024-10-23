'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useDemandLetterListMutation } from '../../../../../lib/features/demandLetter/demandLetterApi'
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
  InputAdornment,
} from '@mui/material'
import { Visibility, Edit, Delete, Search } from '@mui/icons-material'
import { useParams } from 'next/navigation'

export default function Page() {
  const [demandLetters, setDemandLetters] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortField, setSortField] = useState('title')

  const [demandLetterList, { data, isLoading, isSuccess, isError, error }] = useDemandLetterListMutation()
  const params = useParams()
  const { lang: locale } = params

  useEffect(() => {
    const requestData = {
      resource: 'DemandLetter',
      action: 'ListDemandLetter',
      search: searchTerm,
      per_page: perPage,
      page: page,
      sort_by: sortField,
      sort_order: sortOrder,
    }

    demandLetterList(requestData)
  }, [demandLetterList, page, perPage, searchTerm, sortField, sortOrder])

  useEffect(() => {
    if (isSuccess && data) {
      setDemandLetters(data?.results?.data)
    }
  }, [isSuccess, data])

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc'
    setSortOrder(isAsc ? 'desc' : 'asc')
    setSortField(field)
  }

  return (
    <div>
      <Head>
        <title>Demand Letters</title>
        <meta property='og:title' content='Demand Letters' />
      </Head>

      <Box my={4} mx={2}>
        <Typography variant='h4' gutterBottom align="center" color="primary">
          Available Demand Letters
        </Typography>

        {/* Enhanced Search Bar */}
        <Box mb={3} display="flex" justifyContent="center">
          <TextField
            label="Search Demand Letters"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 600 }}
          />
        </Box>

        {/* Loading and Error States */}
        {isLoading && (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        )}

        {isError && <Alert severity='error'>{error?.message || 'Error loading demand letters'}</Alert>}

        {isSuccess && demandLetters?.length === 0 && (
          <Typography align="center" variant="h6">No demand letters found.</Typography>
        )}

        {/* Demand Letter Table */}
        {isSuccess && demandLetters.length > 0 && (
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell>
                    <Typography color="white">SL</Typography>
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
                      active={sortField === 'date_issued'}
                      direction={sortOrder}
                      onClick={() => handleSort('date_issued')}
                      sx={{ color: 'white' }}
                    >
                      Date Issued
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {demandLetters.map((letter, index) => (
                  <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                    <TableCell>{(page - 1) * perPage + index + 1}</TableCell> {/* Serial Number */}
                    <TableCell>{letter.title}</TableCell>
                    <TableCell>{letter.date_issued}</TableCell>

                    <TableCell align="center">
                      <Link href={`/${locale}/demand-letter/${letter.id}`} passHref>
                        <IconButton color="primary">
                          <Visibility />
                        </IconButton>
                      </Link>
                      <IconButton color="secondary">
                        <Edit />
                      </IconButton>
                      <IconButton color="error">
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
        {isSuccess && demandLetters.length > 0 && (
          <Box mt={4} display='flex' justifyContent='center'>
            <Pagination
              count={Math.ceil(data?.results?.total / perPage)}
              page={page}
              onChange={handlePageChange}
              color='primary'
              variant="outlined"
              shape="rounded"
            />
          </Box>
        )}
      </Box>
    </div>
  )
}
