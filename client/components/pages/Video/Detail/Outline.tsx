import React, { useContext } from 'react'
import { Box, Divider, Typography } from '@material-ui/core'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import { VideoDetailContext } from 'components/pages/Video/Detail/Context'
import FixedRatioBox from 'components/atoms/FixedRatioBox'

const Outline: React.FC = () => {
  const {
    video: {
      outline: { id, title, description, publishedAt },
    },
  } = useContext(VideoDetailContext)
  return (
    <Container>
      <FixedRatioBox ratio={{ width: 16, height: 9 }}>
        <YouTube
          containerClassName="youtube-container"
          videoId={id}
          opts={{ width: '100%', height: '100%' }}
        />
      </FixedRatioBox>
      <Box my={2.5}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {publishedAt}
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
