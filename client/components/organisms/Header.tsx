import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import Router from 'next/router'

import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'

import { VERY_DARK_GRAY } from 'const/color'
import { extractYoutubeVideoId } from 'modules/video/helpers'
import { useMessageCenter } from 'utils/messageCenter'

import SearchBar from 'components/molecules/SearchBar'

type Props = {
  title: ReactNode
}

const Header: React.FC<Props> = ({ title }: Props) => {
  const { showMessage } = useMessageCenter()
  const [searchText, setSearchText] = useState('')

  const handleFinishSearch = () => {
    const videoId = extractYoutubeVideoId(searchText)
    if (!videoId) {
      showMessage('error', 'YouTubeのURLかIDを入力して下さい')
      return
    }
    Router.push('/videos/[id]', `/videos/${videoId}`)
    setSearchText('')
  }

  return (
    <StyledAppBar position="sticky" color="default">
      <Toolbar>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        <Box ml={2.5}>
          <SearchBar
            text={searchText}
            onChange={setSearchText}
            onEnter={handleFinishSearch}
          />
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
