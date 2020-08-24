import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

type Props = {
  title: ReactNode
}

const Header: React.FC<Props> = ({ title }: Props) => {
  return (
    <StyledAppBar position="sticky">
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
`

export default Header
