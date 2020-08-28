import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import DefaultTemplate from 'components/templates/DefaultTemplate'
import { Box, Toolbar, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { fetchVideoDetail, fetchVideos } from 'modules/video/api'
import { VideoDetail, VideoOutline } from 'modules/video/types'
import VideoDetailProvider from 'components/pages/Video/Detail/Context'
import Outline from 'components/pages/Video/Detail/Outline'
import Caption from 'components/pages/Video/Detail/Caption'
import styled from 'styled-components'
import { useMessageCenter } from 'utils/messageCenter'
import { getErrorMessage } from 'modules/error/helpers'
import InitialLoading from 'components/molecules/InitialLoading'
import Videos from 'components/pages/Video/List/Videos'

const Index: React.FC = () => {
  const { showMessage } = useMessageCenter()
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState<VideoOutline[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { videos } = await fetchVideos()
        setVideos(videos)
      } catch (e) {
        showMessage('error', getErrorMessage(e))
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <DefaultTemplate title={'Video List'}>
      {loading ? (
        <InitialLoading />
      ) : (
        <Box m={3}>
          <Videos items={videos} />
        </Box>
      )}
    </DefaultTemplate>
  )
}

export default Index
