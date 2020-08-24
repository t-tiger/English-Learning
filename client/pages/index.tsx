import React from 'react'
import { Box, Typography } from '@material-ui/core'
import DefaultTemplate from 'components/templates/DefaultTemplate'

const Home: React.FC = () => {
  return (
    <DefaultTemplate title="TOP">
      <Box>
        <Typography>index</Typography>
      </Box>
    </DefaultTemplate>
  )
}

export default Home
