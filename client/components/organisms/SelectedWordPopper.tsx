import React from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Fade,
  Paper,
  Typography,
} from '@material-ui/core'
import styled from 'styled-components'

type Props = {
  x: number
  y: number
  text: string
  onClose: () => void
}

const SelectedWordPopper: React.FC<Props> = ({ x, y, text, onClose }) => {
  const textForLink = text.split(' ').join('+')

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Fade in={true}>
        <Container style={{ left: `${x}px`, top: `${y + 30}px` }}>
          <Paper>
            <Box padding={2.5}>
              <Typography>{text}</Typography>
              <Box mt={1.5}>
                <ButtonGroup color="primary">
                  <Button
                    href={`https://ejje.weblio.jp/content/${textForLink}`}
                    target="_blank"
                  >
                    Weblio辞書
                  </Button>
                  <Button
                    href={`https://eow.alc.co.jp/search?q=${textForLink}`}
                    target="_blank"
                  >
                    英辞郎
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Fade>
    </ClickAwayListener>
  )
}

const Container = styled.div`
  position: fixed;
  z-index: 99;
`

export default SelectedWordPopper
