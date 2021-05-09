import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { Box, List, ListItem, Typography } from '@material-ui/core'

import { VideoDetailContext } from 'components/pages/Video/Detail/Context'
import { VideoCaption } from 'modules/video/types'
import { formatCaptionTime } from 'modules/video/helpers'
import { VIDEO_SEEK, VIDEO_STOP } from 'components/pages/Video/Detail/event'
import SelectedWordPopper from 'components/organisms/SelectedWordPopper'

type Props = {
  scrollTo: (offsetTop: number) => void
}

const Caption: React.FC<Props> = ({ scrollTo }) => {
  const {
    video: { captions },
    playingTime,
  } = useContext(VideoDetailContext)

  const currentIndex = getCurrentIndex(playingTime, captions)
  const containerRef = useRef<HTMLElement>()

  useEffect(() => {
    const currentElem = document.getElementById(`caption-${currentIndex}`)
    if (currentElem) {
      scrollTo(currentElem.offsetTop + currentElem.clientHeight)
    }
  }, [currentIndex])

  return (
    <>
      <List ref={containerRef as any} disablePadding>
        {captions.map((caption, i) => (
          <CaptionItem
            key={i}
            id={`caption-${i}`}
            selected={currentIndex === i}
            caption={caption}
          />
        ))}
      </List>
      {containerRef.current && (
        <TextSelection containerElement={containerRef.current} />
      )}
    </>
  )
}

type TextSelectionProps = {
  containerElement: HTMLElement
}

const TextSelection: React.FC<TextSelectionProps> = ({ containerElement }) => {
  const [selectedArea, setSelectedArea] = useState<{
    x: number
    y: number
    text: string
  }>()

  useEffect(() => {
    const onSelectionChange = () => {
      setTimeout(() => {
        const selection = window.getSelection()
        const selectedText = selection?.toString().trim() || ''
        const cleansedText = selectedText && cleanseSelectedText(selectedText)
        if (!selection || !cleansedText || cleansedText === '') {
          setSelectedArea(undefined)
          return
        }
        const range = selection.getRangeAt(0)
        const { x, y } = range.getBoundingClientRect()
        setSelectedArea({ x, y, text: cleansedText })
      }, 10)
    }
    containerElement.addEventListener('mouseup', onSelectionChange, false)
    return () =>
      containerElement.removeEventListener('mouseup', onSelectionChange)
  }, [containerElement])

  if (!selectedArea) {
    return null
  }
  return (
    <SelectedWordPopper
      x={selectedArea.x}
      y={selectedArea.y}
      text={selectedArea.text}
      onClose={() => setSelectedArea(undefined)}
    />
  )
}

type ItemProps = {
  id: string
  selected: boolean
  caption: VideoCaption
}

const CaptionItem: React.FC<ItemProps> = ({ id, selected, caption }) => {
  const { eventEmitter, captionSelectionDisabled } = useContext(
    VideoDetailContext,
  )

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
        {captionSelectionDisabled ? (
          <SelectDisabledTypography>{caption.text}</SelectDisabledTypography>
        ) : (
          <Typography>{caption.text}</Typography>
        )}
      </Box>
      <SelectDisabledTypography className="caption-time" variant="body2">
        {formatCaptionTime(caption.start)}
      </SelectDisabledTypography>
    </ListItem>
  )
}

const SelectDisabledTypography = styled(Typography)`
  user-select: none;
`

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

const cleanseSelectedText = (text: string) =>
  text.replace(/\d{2,}:\d{2,}/g, '').replace(/\s{2,}/g, ' ')

export default Caption
