import React, { useEffect } from 'react'
import DefaultTemplate from 'components/templates/DefaultTemplate'
import { Box, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { fetchVideoDetail } from 'modules/video/api'

const Index: React.FC = () => {
  const { id } = useRouter().query
  useEffect(() => {
    if (!id) {
      return
    }
    const fetchVideo = async () => {
      try {
        const data = await fetchVideoDetail(id as string)
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchVideo()
  }, [id])

  return (
    <DefaultTemplate title="VIDEO">
      <Box>
        <Typography>video</Typography>
      </Box>
    </DefaultTemplate>
  )
}

export default Index
