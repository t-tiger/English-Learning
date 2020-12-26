import React, { useEffect, useState, } from 'react'
import { Box } from '@material-ui/core'

import { fetchVideos } from 'modules/video/api'
import { VideoOutline } from 'modules/video/types'
import { useMessageCenter } from 'utils/messageCenter'
import { getErrorMessage } from 'modules/error/helpers'

import DefaultTemplate from 'components/templates/DefaultTemplate'
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
