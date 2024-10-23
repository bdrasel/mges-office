import { TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'

export default function JobHead() {
  return (
    <TableHead sx={{ backgroundColor: '#7367F0' }}>
      <TableRow>
        <TableCell>
          <Typography fontWeight='bold' color='white'>
            SL
          </Typography>
        </TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Location</TableCell>
        <TableCell>Level</TableCell>
        <TableCell>Employment Type</TableCell>
        <TableCell>Salary</TableCell>
        <TableCell align='center'>Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}
