'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useViewJobMutation } from '../../../../../lib/features/jobs/jobApi'
import {
  Box,
  CircularProgress,
  Alert,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Divider,
} from '@mui/material'
import { ArrowBack, LocationOn, Work, AttachMoney, DateRange } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export default function ViewJob() {
  const { id } = useParams()
  const router = useRouter()
  
  const [job, setJob] = useState(null)
  const [viewJob, { data, isLoading, isSuccess, isError, error }] = useViewJobMutation()

  useEffect(() => {
    if (id) {
      const requestData = {
        resource: 'Job',
        action: 'ViewJob',
        id: id
      }
      viewJob(requestData)
    }
  }, [id, viewJob])

  useEffect(() => {
    if (isSuccess && data) {
      setJob(data?.results)
    }
  }, [isSuccess, data])

  const handleGoBack = () => {
    router.back()
  }

  return (
    <Box my={4} mx={2}>
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={handleGoBack}
        sx={{ mb: 3, borderRadius: 2, color: 'primary.main', borderColor: 'primary.main' }}
      >
        Back
      </Button>

      {isLoading && (
        <Box display="flex" justifyContent="center" my={3}>
          <CircularProgress />
        </Box>
      )}

      {isError && <Alert severity="error">{error?.message || 'Error fetching job details'}</Alert>}

      {isSuccess && job && (
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {job.title}
            </Typography>

            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6}>
                <Chip icon={<LocationOn />} label={job.location} color="primary" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Chip icon={<Work />} label={job.level} color="secondary" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Chip icon={<Work />} label={job.employment_type} color="success" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Chip icon={<AttachMoney />} label={job.offered_salary ? `$${job.offered_salary}` : 'Not specified'} color="info" variant="outlined" />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Responsibilities
              </Typography>
              <Typography variant="body1" gutterBottom>
                {job.responsibilities || 'No specific responsibilities listed.'}
              </Typography>
            </Box>

            <Grid container spacing={2} mt={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Minimum Experience
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {job.min_exp ? `${job.min_exp} years` : 'Not specified'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Education Level
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {job.education_level || 'Not specified'}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Professional Skills
              </Typography>
              <Typography variant="body1" gutterBottom>
                {job.professional_skills || 'No specific skills listed.'}
              </Typography> 
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Additional Details
              </Typography>
              <Typography variant="body1" gutterBottom>
                {job.details_optional || 'No additional details provided.'}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1">
                Email: {job.contact_email || 'Not provided'}
              </Typography>
              <Typography variant="body1">
                Address: {job.contact_address || 'Not provided'}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Deadline
              </Typography>
              <Typography variant="body1" color="error" display="flex" alignItems="center">
                <DateRange sx={{ mr: 1 }} />
                {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'No deadline specified'}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}
