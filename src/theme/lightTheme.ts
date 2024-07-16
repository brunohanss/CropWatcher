import { extendTheme } from "@chakra-ui/react";

export const lightTheme = extendTheme({
  colors: {
    "dark-1": "#BF372A",
    "dark-2": "#F25430",
    "neutral": "#D9C4B8",
    "light-1": "#F2D479",
    "light-2": "#8A8C3F"
  },
  textStyles: {
    "dark-1": { color: 'white' },
    "dark-2": { color: 'black' },
    "neutral": { color: 'black' },
    "light-1": { color: 'black' },
    "light-2": { color: 'black' }
  }
});