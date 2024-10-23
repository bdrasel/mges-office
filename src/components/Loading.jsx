import { Box, CircularProgress } from '@mui/material'

export default function Loading() {
  return (
    <Box display='flex' justifyContent='center' my={3}>
      <CircularProgress />
    </Box>
  )
}
