import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

const InitialLoading: React.FC = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="300px"
  >
    <CircularProgress color="primary" size={80} />
  </Box>
)

export default InitialLoading
