'use client'

import { useQuotaListQuery } from '../../../../lib/features/quota/quotaApi'
import { useState, useEffect } from 'react' // Import useState and useEffect
import Head from 'next/head'
import Link from 'next/link'
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
  const [quotas, setQuotas] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortField, setSortField] = useState('name')

  const { data, isLoading, isSuccess, isError, error } = useQuotaListQuery({
    resource: 'Quota',
    action: 'ListQuota',
    search: searchTerm,
    per_page: perPage,
    page: page,
    sort_by: sortField,
    sort_order: sortOrder,
  })

  useEffect(() => {
    if (isSuccess && data) {
      setQuotas(data?.results?.data)
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
        <title>Quota List Page</title>
        <meta property='og:title' content='Quota List Page' />
      </Head>

      <Box my={4} mx={2}>
        <Typography variant='h4' gutterBottom align="center" color="primary">
          Available Quotas
        </Typography>

        {/* Enhanced Search Bar */}
        <Box mb={3} display="flex" justifyContent="center">
          <TextField
            label="Search Quotas"
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

        {isError && <Alert severity='error'>{error?.message || 'Error loading quotas'}</Alert>}

        {isSuccess && quotas.length === 0 && (
          <Typography align="center" variant="h6">No quotas found.</Typography>
        )}

        {/* Quota Table */}
        {isSuccess && quotas.length > 0 && (
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell>
                    <Typography color="white">SL</Typography>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortField === 'name'}
                      direction={sortOrder}
                      onClick={() => handleSort('name')}
                      sx={{ color: 'white' }}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortField === 'quota_type'}
                      direction={sortOrder}
                      onClick={() => handleSort('quota_type')}
                      sx={{ color: 'white' }}
                    >
                      Quota Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortField === 'value'}
                      direction={sortOrder}
                      onClick={() => handleSort('value')}
                      sx={{ color: 'white' }}
                    >
                      Value
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quotas.map((quota, index) => (
                  <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                    <TableCell>{(page - 1) * perPage + index + 1}</TableCell> {/* Serial Number */}
                    <TableCell>{quota.name}</TableCell>
                    <TableCell>{quota.quota_type}</TableCell>
                    <TableCell>{quota.value || 'Not specified'}</TableCell>

                    <TableCell align="center">
                      <IconButton color="primary">
                        <Visibility />
                      </IconButton>
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
        {isSuccess && quotas.length > 0 && (
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
