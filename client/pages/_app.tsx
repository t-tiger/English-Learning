import React, { ReactElement } from 'react'
import { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { mainTheme } from 'const/theme'

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
