import { createMuiTheme } from '@material-ui/core'
import {
  PURE_PINK,
  VERY_DARK_GRAY_MOSTLY_BLACK,
  VERY_SOFT_PINK,
} from 'const/color'

export const mainTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: VERY_DARK_GRAY_MOSTLY_BLACK,
    },
    primary: {
      main: VERY_SOFT_PINK,
    },
    secondary: {
      main: PURE_PINK,
    },
  },
})
