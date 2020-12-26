import React from 'react'
import Link from 'components/atoms/Link'
import styled from 'styled-components'

import { Box, Grid, Typography } from '@material-ui/core'

import { VideoOutline } from 'modules/video/types'
import { findVideoThumb } from 'modules/video/helpers'

import FixedRatioBox from 'components/atoms/FixedRatioBox'

type Props = {
  items: VideoOutline[]
}

const Videos: React.FC<Props> = ({ items }) => {
  return (
    <Grid container spacing={3}>
      {items.map((video, i) => (
        <VideoItem key={`${video.id}-${i}`} video={video} />
      ))}
    </Grid>
  )
}

type ItemProps = {
  video: VideoOutline
}

const VideoItem: React.FC<ItemProps> = ({ video }) => {
  return (
    <Grid key={video.id} item xs container direction="column">
      <Link
        href="/videos/[id]"
        as={`/videos/${video.id}`}
        style={{ color: 'inherit' }}
        passHref
        noDecoration
      >
        <div>
          <ImageContainer mb={1.5}>
            <FixedRatioBox ratio={{ width: 16, height: 9 }}>
              <img
                src={findVideoThumb(video.thumbnails, 'medium').url}
                alt={video.title}
                style={{ width: '100%' }}
              />
            </FixedRatioBox>
          </ImageContainer>
          <Title variant="body1" gutterBottom>
            {video.title}
          </Title>
          <CaptionText variant="caption">{video.channelTitle}</CaptionText>
          <CaptionText variant="caption">
            {new Date(video.publishedAt).toLocaleString('ja-JP')}
          </CaptionText>
        </div>
      </Link>
    </Grid>
  )
}

const ImageContainer = styled(Box)`
  min-width: 280px;
`
const Title = styled(Typography)`
  font-weight: bold;
`
const CaptionText = styled(Typography)`
  display: block;
`

export default Videos
