import React from 'react'
import DefaultTemplate from 'components/templates/DefaultTemplate'
import { Box, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

const Index: React.FC = () => {
  const { id } = useRouter().query
  console.log(id)

  return (
    <DefaultTemplate title="VIDEO">
      <Box>
        <Typography>video</Typography>
      </Box>
    </DefaultTemplate>
  )
}

export default Index
