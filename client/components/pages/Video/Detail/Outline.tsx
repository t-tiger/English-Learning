import React, { useContext, useEffect, useRef } from 'react'
import { Box, Divider, Typography } from '@material-ui/core'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import { VideoDetailContext } from 'components/pages/Video/Detail/Context'
import FixedRatioBox from 'components/atoms/FixedRatioBox'
import { parseDateTxt } from 'modules/date/helpers'
import { YouTubePlayer } from 'youtube-player/dist/types'

const Outline: React.FC = () => {
  const {
    video: {
      outline: { id, title, description, publishedAt },
    },
    setPlayingTime,
    registerSeekEvent,
  } = useContext(VideoDetailContext)
  const { current: state } = useRef<{ player: YouTubePlayer | null }>({
    player: null,
  })

  useEffect(() => {
    const itvId = setInterval(() => {
      const currentTime = state.player?.getCurrentTime()
      if (currentTime) {
        setPlayingTime(currentTime)
      }
    }, 500)

    return () => {
      clearInterval(itvId)
    }
  }, [state])

  const handlePlayerReady = (event: { target: any }) => {
    state.player = event.target
    registerSeekEvent((time: number) => {
      state.player?.seekTo(time, true)
      state.player?.playVideo()
    })
  }

  return (
    <Container>
      <FixedRatioBox ratio={{ width: 16, height: 9 }}>
        <YouTube
          containerClassName="youtube-container"
          id="youtubeVideo"
          videoId={id}
          opts={{ width: '100%', height: '100%' }}
          onReady={handlePlayerReady}
        />
      </FixedRatioBox>
      <Box my={2.5}>
        <Typography
          variant="h4"
          component="h1"
          style={{ fontWeight: 'bold' }}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {parseDateTxt(publishedAt)} 投稿
        </Typography>
      </Box>
      <Divider />
      <Box my={2}>
        <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
          {description}
        </Typography>
      </Box>
    </Container>
  )
}

const Container = styled(Box)`
  .youtube-container {
    height: 100%;
  }
`

export default Outline
