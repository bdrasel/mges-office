import Link from 'next/link'

import { useParams } from 'next/navigation'

import { TableCell, TableRow, IconButton } from '@mui/material'
import { Visibility, Edit, Delete } from '@mui/icons-material'

export default function JobItem({ job, page, perPage, index }) {
  const params = useParams()
  const { lang: locale } = params

  return (
    <>
      <TableRow hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
        <TableCell>{(page - 1) * perPage + index + 1}</TableCell> {/* Serial Number */}
        <TableCell>{job?.title}</TableCell>
        <TableCell>{job?.location}</TableCell>
        <TableCell>{job?.level}</TableCell>
        <TableCell>{job?.employement_type}</TableCell>
        <TableCell>{job?.offered_salary || 'Not specified'}</TableCell>
        <TableCell align='center'>
          <Link href={`/${locale}/job/${job?.id}`} passHref>
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
    </>
  )
}
