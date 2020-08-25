import React, { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  ratio: { width: number; height: number }
  style?: React.CSSProperties
  children: ReactNode
}

const FixedRatioBox: React.FC<Props> = ({
  ratio: { width, height },
  style,
  children,
}: Props) => {
  const percent = Math.floor((height / width) * 100)
  return (
    <Wrapper style={{ ...style, paddingTop: `${percent}%` }}>
      <div>{children}</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 0;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`

export default FixedRatioBox
