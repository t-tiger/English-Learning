import React, { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import { Box } from '@material-ui/core'
import styled from 'styled-components'
import Header from 'components/organisms/Header'

type Props = {
  children: ReactNode
  title: string
  headerTitle?: ReactNode
}

const DefaultTemplate: React.FC<Props> = ({
  children,
  title,
  headerTitle,
}: Props): ReactElement => {
  return (
    <Root>
      <Head>
        <title>
          {title && `${title} | `}
          English Learning
        </title>
      </Head>
      <Box>
        <Header title={headerTitle || title} />
        <Main component="main">{children}</Main>
      </Box>
    </Root>
  )
}

const Root = styled.div`
  min-height: 100vh;
`
const Main = styled(Box)`
  flex-grow: 1;
`

export default DefaultTemplate
