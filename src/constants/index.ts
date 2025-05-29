import {Theme} from "../components/ThemeProvider";


const COLORS = {
  [Theme.light]: {
    APP_MAIN_BG_COLOR: '#faca7a',
    FIRST_COLOR: '#B38B1A',
    SECOND_COLOR: '#FFF8EC',
    THIRD_COLOR: '#DFE0DF',
  },
  [Theme.dark]: {
    APP_MAIN_BG_COLOR: '#191926',
    FIRST_COLOR: '#444463',
    SECOND_COLOR: '#AAA9BC',
    THIRD_COLOR: '#191926',
  },
  [Theme.pink]: {
    APP_MAIN_BG_COLOR: '#F19696',
    FIRST_COLOR: '#EF626A',
    SECOND_COLOR: '#FFF4F3',
    THIRD_COLOR: '#FEEBD6',
  }
}

export {
  COLORS
}