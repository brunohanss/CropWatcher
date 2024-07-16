import { extendTheme } from "@chakra-ui/react";

export const darkTheme = extendTheme({
  colors: {
    "dark-1": "#011526",
    "dark-2": "#012E40",
    "neutral": "#025959",
    "light-1": "#02735E",
    "light-2": "#038C65"
  },
  textStyles: {
    "dark-1": { color: 'white' },
    "dark-2": { color: 'white' },
    "neutral": { color: 'white' },
    "light-1": { color: 'white' },
    "light-2": { color: 'black' }
  }
});