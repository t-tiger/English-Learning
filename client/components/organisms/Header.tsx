import React, { ReactNode } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import SearchBar from 'components/molecules/SearchBar'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import { VERY_DARK_GRAY } from 'const/color'
import { extractYoutubeVideoId } from 'modules/video/helpers'
import { useMessageCenter } from 'utils/messageCenter'

type Props = {
  title: ReactNode
}

const Header: React.FC<Props> = ({ title }: Props) => {
  const { showMessage } = useMessageCenter()

  const handleFinishSearch = (text: string) => {
    const videoId = extractYoutubeVideoId(text)
    if (!videoId) {
      showMessage('error', 'YouTubeのURLかIDを入力して下さい')
      return
    }
    Router.push('/videos/[id]', `/videos/${videoId}`)
  }

  return (
    <StyledAppBar position="sticky" color="default">
      <Toolbar>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        <Box ml={2.5}>
          <SearchBar onEnter={handleFinishSearch} />
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}

const StyledAppBar = styled(AppBar)`
  overflow-x: auto;
  background-color: ${VERY_DARK_GRAY};
`

export default Header
