import React, { ReactNode, useEffect, useState } from 'react'
import { VideoDetail } from 'modules/video/types'

export type VideoDetailState = {
  video: VideoDetail
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
  const [video, setVideo] = useState({ ...propVideo })

  useEffect(() => {
    setVideo(video)
  }, [video])

  const state: VideoDetailState = {
    video,
  }
  return (
    <VideoDetailContext.Provider value={state}>
      {children}
    </VideoDetailContext.Provider>
  )
}

export default VideoDetailProvider
