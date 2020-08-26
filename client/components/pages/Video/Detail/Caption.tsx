import React, { useContext, useEffect } from 'react'
import { Box, List, ListItem, Typography } from '@material-ui/core'
import { VideoDetailContext } from 'components/pages/Video/Detail/Context'
import { VideoCaption } from 'modules/video/types'
import { formatCaptionTime } from 'modules/video/helpers'
import { VIDEO_SEEK, VIDEO_STOP } from 'components/pages/Video/Detail/event'

type Props = {
  scrollTo: (offsetTop: number) => void
}

const Caption: React.FC<Props> = ({ scrollTo }) => {
  const {
    video: { captions },
    playingTime,
  } = useContext(VideoDetailContext)

  const currentIndex = getCurrentIndex(playingTime, captions)

  useEffect(() => {
    const currentElem = document.getElementById(`caption-${currentIndex}`)
    if (currentElem) {
      scrollTo(currentElem.offsetTop + currentElem.clientHeight)
    }
  }, [currentIndex])

  return (
    <List disablePadding>
      {captions.map((caption, i) => (
        <CaptionItem
          key={i}
          id={`caption-${i}`}
          selected={currentIndex === i}
          caption={caption}
        />
      ))}
    </List>
  )
}

type ItemProps = {
  id: string
  selected: boolean
  caption: VideoCaption
}

const CaptionItem: React.FC<ItemProps> = ({ id, selected, caption }) => {
  const { eventEmitter } = useContext(VideoDetailContext)

  const handleClick = () => {
    eventEmitter.emit(VIDEO_STOP)
  }
  const handleDoubleClick = () => {
    eventEmitter.emit(VIDEO_SEEK, caption.start)
  }

  return (
    <ListItem
      id={id}
      disableGutters
      selected={selected}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <Box flex={1} mr={1.5}>
        <Typography>{caption.text}</Typography>
      </Box>
      <Typography variant="body2">
        {formatCaptionTime(caption.start)}
      </Typography>
    </ListItem>
  )
}

const getCurrentIndex = (
  playingTime: number,
  captions: VideoCaption[],
): number => {
  let i = -1
  for (const c of captions) {
    if (c.start > playingTime) break
    i++
  }
  return Math.max(i, 0)
}

export default Caption
