import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { VideoDetail } from 'modules/video/types'

export type VideoDetailState = {
  video: VideoDetail
  playingTime: number
  setPlayingTime: (value: number) => void
  publishSeekEvent: (time: number) => void
  registerSeekEvent: (callback: (time: number) => unknown) => void
}

export const VideoDetailContext = React.createContext<VideoDetailState>(null!)

type Props = {
  video: VideoDetail
  children: ReactNode
}
type State = {
  seekCallbacks: Array<(time: number) => unknown>
}

export const VideoDetailProvider: React.FC<Props> = ({
  video: propVideo,
  children,
}: Props) => {
  const [video, setVideo] = useState({ ...propVideo })
  const [playingTime, setPlayingTime] = useState(0)
  const { current: state } = useRef<State>({ seekCallbacks: [] })

  const publishSeekEvent = useCallback(
    (time: number) => state.seekCallbacks.forEach((c) => c(time)),
    [state],
  )
  const registerSeekEvent = useCallback(
    (callback: (time: number) => unknown) => {
      state.seekCallbacks.push(callback)
    },
    [state],
  )

  useEffect(() => {
    setVideo(video)
  }, [video])

  const providerState: VideoDetailState = {
    video,
    playingTime,
    setPlayingTime,
    publishSeekEvent,
    registerSeekEvent,
  }
  return (
    <VideoDetailContext.Provider value={providerState}>
      {children}
    </VideoDetailContext.Provider>
  )
}

export default VideoDetailProvider
