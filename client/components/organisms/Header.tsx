import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import { VERY_DARK_GRAY } from 'const/color'
import SearchBar from 'components/molecules/SearchBar'

type Props = {
  title: ReactNode
}

const Header: React.FC<Props> = ({ title }: Props) => {
  const handleFinishSearch = (text: string) => {
    console.log(text)
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
