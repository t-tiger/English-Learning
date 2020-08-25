import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import DefaultTemplate from 'components/templates/DefaultTemplate'
import { Box, Toolbar, Typography } from '@material-ui/core'
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
          <Content />
        </VideoDetailProvider>
      )}
    </DefaultTemplate>
  )
}

const Content: React.FC = () => {
  const renderItem = (children: ReactNode): ReactElement => (
    <Item>
      <Toolbar />
      <ItemContent>{children}</ItemContent>
    </Item>
  )

  return (
    <Box>
      {renderItem(<Outline />)}
      {renderItem(<Caption />)}
    </Box>
  )
}

const Item = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 50%;

  &:first-child {
    left: 0;
  }
  &:last-child {
    right: 0;
  }
`
const ItemContent = styled.div`
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
`

export default Index
