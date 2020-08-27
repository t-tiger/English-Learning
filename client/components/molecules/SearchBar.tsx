import React, { KeyboardEventHandler, useState } from 'react'
import styled from 'styled-components'
import { Box, fade, InputBase, useTheme } from '@material-ui/core'
import { Search } from '@material-ui/icons'

type Props = {
  onEnter: (text: string) => unknown
}

const SearchBar: React.FC<Props> = ({ onEnter }) => {
  const theme = useTheme()
  const [value, setValue] = useState('')
  // value to detect whether in progress of IME conversion
  const [isComposing, setComposing] = useState(false)

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isComposing) {
      onEnter(value)
    }
  }
  const handleCompositionStart = () => {
    setComposing(true)
  }
  const handleCompositionEnd = () => {
    setComposing(false)
  }

  return (
    <Container theme={theme}>
      <IconContainer theme={theme}>
        <Search />
      </IconContainer>
      <InputBase
        placeholder="Search…"
        classes={{
          root: 'input-root',
          input: 'input-input',
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={handleChangeValue}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    </Container>
  )
}

const Container = styled(Box)(
  ({ theme }) => `
    position: relative;
    border-radius: ${theme.shape.borderRadius}px;
    background-color: ${fade(theme.palette.common.white, 0.15)};
    &:hover {
      background-color: ${fade(theme.palette.common.white, 0.25)};
    }
    margin-right: ${theme.spacing(2)};
    margin-left: 0;
    width: 100%;
    ${theme.breakpoints.up('sm')} {
      margin-left: ${theme.spacing(3)};
      width: auto;
    }
    
    .input-root {
      color: inherit;
    }
    .input-input {
      padding: ${theme.spacing(1, 1, 1, 0)};
      padding-left: calc(1em + ${theme.spacing(4)}px);
      transition: ${theme.transitions.create('width')};
      width: 100%;
      ${theme.breakpoints.up('md')} {
        width: 20ch;
      }
    }
  `,
)
const IconContainer = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(0, 2)};
    height: 100%;
    position: absolute;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
)

export default SearchBar
