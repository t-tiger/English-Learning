import React, { ReactElement, ReactNode, useEffect, useRef, useState, } from 'react'
import styled from 'styled-components'

import { Box, Toolbar } from '@material-ui/core'
import { useRouter } from 'next/router'
import { fetchVideoDetail } from 'modules/video/api'
import { VideoDetail } from 'modules/video/types'
import { useMessageCenter } from 'utils/messageCenter'
import { getErrorMessage } from 'modules/error/helpers'

import VideoDetailProvider from 'components/pages/Video/Detail/Context'
import Outline from 'components/pages/Video/Detail/Outline'
import Caption from 'components/pages/Video/Detail/Caption'
import DefaultTemplate from 'components/templates/DefaultTemplate'
import InitialLoading from 'components/molecules/InitialLoading'

const Index: React.FC = () => {
  const { id } = useRouter().query
  const { showMessage } = useMessageCenter()
  const [loading, setLoading] = useState(false)
  const [video, setVideo] = useState<VideoDetail | null>(null)

  useEffect(() => {
    if (!id) {
      return
    }
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchVideoDetail(id as string)
        setVideo(data)
      } catch (e) {
        showMessage('error', getErrorMessage(e))
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  return (
    <DefaultTemplate title={video?.outline.title || 'Video Title'}>
      {loading || !video ? (
        <InitialLoading />
      ) : (
        <VideoDetailProvider video={video}>
          <Content />
        </VideoDetailProvider>
      )}
    </DefaultTemplate>
  )
}

const Content: React.FC = () => {
  const captionContainerRef = useRef<HTMLDivElement>()

  const renderItem = (children: ReactNode): ReactElement => (
    <Item>
      <Toolbar />
      {children}
    </Item>
  )

  const handleScrollTo = (offsetTop: number) => {
    const elem = captionContainerRef.current
    if (!elem) {
      return
    }
    const height = elem.clientHeight
    const scrollTop = Math.max(offsetTop - height / 2, 0)
    elem.scrollTo({ top: scrollTop, behavior: 'smooth' })
  }

  return (
    <Box>
      {renderItem(
        <ItemContent>
          <Outline />
        </ItemContent>,
      )}
      {renderItem(
        <ItemContent ref={captionContainerRef as any}>
          <Caption scrollTo={handleScrollTo} />
        </ItemContent>,
      )}
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
