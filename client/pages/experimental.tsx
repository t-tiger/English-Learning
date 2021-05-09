import React, { useEffect, useRef, useState } from 'react'
import { YouTubePlayer } from 'youtube-player/dist/types'
import YouTube from 'react-youtube'
import FixedRatioBox from 'components/atoms/FixedRatioBox'
import { Box } from '@material-ui/core'
import styled from 'styled-components'

const Experimental = () => {
  const series = [
    {
      id: 't3HPK7Qq8sk',
      ranges: [
        { from: 12, to: 15 },
        { from: 92, to: 96 },
        { from: 108, to: 111 },
      ],
    },
    {
      id: '2kVos9KsURc',
      ranges: [
        { from: 12, to: 20 },
        { from: 92, to: 96 },
        { from: 98, to: 101 },
      ],
    },
  ]
  const [videoState, setVideoState] = useState<{
    video: number
    range: number
  } | null>(null)
  const state = useRef(videoState)
  const [player, setPlayer] = useState<YouTubePlayer | null>(null)

  const handlePlayerReady = (event: { target: any }) => {
    setPlayer(event.target)
  }

  useEffect(() => {
    setTimeout(() => {
      setVideoState({ video: 0, range: 0 })
    }, 100)
  }, [])

  useEffect(() => {
    const itvId = setInterval(() => {
      const currentTime = player?.getCurrentTime()
      if (!currentTime || !videoState) {
        return
      }
      console.log(currentTime, videoState)
      const until = series[videoState.video].ranges[videoState.range].to
      if (currentTime >= until) {
        const rangeNum = series[videoState.video].ranges.length
        if (rangeNum - 1 > videoState.range) {
          setVideoState({
            video: videoState.video,
            range: videoState.range + 1,
          })
          return
        }
        if (series.length - 1 > videoState.video) {
          setVideoState({ video: videoState.video + 1, range: 0 })
          return
        }
        setVideoState(null)
      }
    }, 300)

    return () => {
      clearInterval(itvId)
    }
  }, [player, videoState])

  useEffect(() => {
    if (!videoState || !player) {
      return
    }
    if (
      !state.current ||
      state.current.video !== videoState.video ||
      state.current.range !== videoState.range
    ) {
      player.seekTo(
        series[videoState.video].ranges[videoState.range].from,
        true,
      )
      player.playVideo()
    }
    state.current = videoState
  }, [videoState, player])

  if (!videoState) {
    return 'Loading'
  }
  return (
    <Container>
      <FixedRatioBox
        ratio={{ width: 16, height: 9 }}
        style={{ backgroundColor: '#000' }}
      >
        <YouTube
          containerClassName="youtube-container"
          videoId={series[videoState.video].id}
          opts={{ width: '100%', height: '100%' }}
          onReady={handlePlayerReady}
        />
      </FixedRatioBox>
    </Container>
  )
}

const Container = styled(Box)`
  .youtube-container {
    height: 100%;
  }
`

export default Experimental
