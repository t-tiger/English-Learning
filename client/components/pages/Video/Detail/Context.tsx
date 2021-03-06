import React, { ReactNode, useEffect, useState } from 'react'

import { VideoDetail } from 'modules/video/types'

import EventEmitter from 'utils/eventEmitter'

export type VideoDetailState = {
  eventEmitter: EventEmitter
  video: VideoDetail
  playingTime: number
  setPlayingTime: (value: number) => void
  captionSelectionDisabled: boolean
  setCaptionSelectionDisabled: (val: boolean) => void
}

export const VideoDetailContext = React.createContext<VideoDetailState>(null!)

type Props = {
  video: VideoDetail
  children: ReactNode
}

export const VideoDetailProvider: React.FC<Props> = ({
  video: propVideo,
  children,
}: Props) => {
  const [eventEmitter] = useState(new EventEmitter())
  const [video, setVideo] = useState({ ...propVideo })
  const [playingTime, setPlayingTime] = useState(0)
  const [captionSelectionDisabled, setCaptionSelectionDisabled] = useState(false)

  useEffect(() => {
    setVideo({ ...propVideo })
  }, [propVideo])

  const state: VideoDetailState = {
    eventEmitter,
    video,
    playingTime,
    setPlayingTime,
    captionSelectionDisabled,
    setCaptionSelectionDisabled,
  }
  return (
    <VideoDetailContext.Provider value={state}>
      {children}
    </VideoDetailContext.Provider>
  )
}

export default VideoDetailProvider
