import { Box, Pagination } from '@mui/material'

export default function PaginationComponent({ count, page, handleOnChange }) {
  return (
    <Box mt={4} display='flex' justifyContent='center'>
      <Pagination
        count={count}
        page={page}
        onChange={handleOnChange}
        color='primary'
        variant='outlined'
        shape='rounded'
      />
    </Box>
  )
}
