import { InputAdornment, TextField, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'

export default function SearchComponent({ handleSearchTerm, value, label, title }) {
  return (
    <>
      <TextField
        label={label}
        variant='outlined'
        fullWidth
        value={value}
        onChange={handleSearchTerm}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          )
        }}
        sx={{ maxWidth: 600 }}
      />
    </>
  )
}
