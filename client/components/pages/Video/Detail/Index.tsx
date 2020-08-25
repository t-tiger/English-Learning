import React, { useEffect, useState } from 'react'
import DefaultTemplate from 'components/templates/DefaultTemplate'
import { Box, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { fetchVideoDetail } from 'modules/video/api'
import { VideoDetail } from 'modules/video/types'
import VideoDetailProvider from 'components/pages/Video/Detail/Context'
import Outline from 'components/pages/Video/Detail/Outline'
import Caption from 'components/pages/Video/Detail/Caption'
import styled from 'styled-components'

const Index: React.FC = () => {
  const { id } = useRouter().query
  const [video, setVideo] = useState<VideoDetail | null>(null)

  useEffect(() => {
    if (!id) {
      return
    }
    const fetchVideo = async () => {
      try {
        const data = await fetchVideoDetail(id as string)
        setVideo(data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchVideo()
  }, [id])

  return (
    <DefaultTemplate title={video?.outline.title || ''}>
      {!video ? (
        <Box>
          <Typography>loading</Typography>
        </Box>
      ) : (
        <VideoDetailProvider video={video}>
          <Container>
            <Outline />
            <Caption />
          </Container>
        </VideoDetailProvider>
      )}
    </DefaultTemplate>
  )
}

const Container = styled(Box)`
  display: flex;
  
  > * {
    flex: 1;
    padding: 20px;
  }
`

export default Index
