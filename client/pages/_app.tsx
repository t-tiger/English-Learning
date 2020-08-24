import React, { ReactElement } from 'react'
import { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { mainTheme } from 'const/theme'

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
