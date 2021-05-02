import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from '@material-ui/core'
import { YouTubePlayer } from 'youtube-player/dist/types'

import { VideoDetailContext } from 'components/pages/Video/Detail/Context'
import { parseDateTxt } from 'modules/date/helpers'
import { VIDEO_SEEK, VIDEO_STOP } from 'components/pages/Video/Detail/event'

import YouTube from 'react-youtube'
import FixedRatioBox from 'components/atoms/FixedRatioBox'

const Outline: React.FC = () => {
  const {
    video: {
      outline: { id, title, description, publishedAt },
    },
    setPlayingTime,
    captionSelectionDisabled,
    setCaptionSelectionDisabled,
    eventEmitter,
  } = useContext(VideoDetailContext)
  const [videoVisibility, setVideoVisibility] = useState(true)
  const [player, setPlayer] = useState<YouTubePlayer | null>(null)

  useEffect(() => {
    const itvId = setInterval(() => {
      const currentTime = player?.getCurrentTime()
      if (currentTime) {
        setPlayingTime(currentTime)
      }
    }, 500)

    return () => {
      clearInterval(itvId)
    }
  }, [player])

  useEffect(() => {
    if (!player) {
      return
    }
    const onReceiveSeekEvent = (time: number) => {
      player.seekTo(time, true)
      player.playVideo()
    }
    const onReceiveStopEvent = () => {
      player.pauseVideo()
    }
    eventEmitter.on(VIDEO_SEEK, onReceiveSeekEvent)
    eventEmitter.on(VIDEO_STOP, onReceiveStopEvent)
    return () => {
      eventEmitter.off(VIDEO_SEEK, onReceiveSeekEvent)
      eventEmitter.off(VIDEO_STOP, onReceiveStopEvent)
    }
  }, [player])

  const handleChangeVideoVisibility = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setVideoVisibility(e.target.checked)
  }
  const handleChangeCaptionSelection = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCaptionSelectionDisabled(e.target.checked)
  }
  const handlePlayerReady = (event: { target: any }) => {
    setPlayer(event.target)
  }

  return (
    <Container>
      <FixedRatioBox
        ratio={{ width: 16, height: videoVisibility ? 9 : 0 }}
        style={{ backgroundColor: '#000' }}
      >
        <YouTube
          containerClassName="youtube-container"
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
        <Box display="flex">
          <FormControlLabel
            control={
              <Checkbox
                checked={videoVisibility}
                onChange={handleChangeVideoVisibility}
              />
            }
            label="Display video"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={captionSelectionDisabled}
                onChange={handleChangeCaptionSelection}
              />
            }
            label="Caption selection disabled"
          />
        </Box>
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
