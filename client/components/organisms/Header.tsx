import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { VERY_DARK_GRAY } from 'const/color'

type Props = {
  title: ReactNode
}

const Header: React.FC<Props> = ({ title }: Props) => {
  return (
    <StyledAppBar position="sticky" color="default">
      <Toolbar>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </StyledAppBar>
  )
}

const StyledAppBar = styled(AppBar)`
  overflow-x: auto;
  background-color: ${VERY_DARK_GRAY};
`

export default Header
