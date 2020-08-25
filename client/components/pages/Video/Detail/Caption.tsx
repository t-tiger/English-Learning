import React, { useContext } from 'react'
import { Box, List, ListItem, Typography } from '@material-ui/core'
import { VideoDetailContext } from 'components/pages/Video/Detail/Context'
import { VideoCaption } from 'modules/video/types'
import { formatCaptionTime } from 'modules/video/helpers'

const Caption: React.FC = () => {
  const {
    video: { captions },
  } = useContext(VideoDetailContext)

  return (
    <List disablePadding>
      {captions.map((caption, i) => (
        <CaptionItem key={i} caption={caption} />
      ))}
    </List>
  )
}

type ItemProps = {
  caption: VideoCaption
}

const CaptionItem: React.FC<ItemProps> = ({ caption }) => {
  const handleClick = () => {
    console.log(caption)
  }

  return (
    <ListItem button disableGutters onClick={handleClick}>
      <Box flex={1} mr={1.5}>
        <Typography>{caption.text}</Typography>
      </Box>
      <Typography variant="body2">
        {formatCaptionTime(caption.start)}
      </Typography>
    </ListItem>
  )
}

export default Caption
