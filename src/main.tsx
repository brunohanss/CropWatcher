import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from '@chakra-ui/react';

const colors = {
  primary: {
    100: '#5E88BF',
    200: '#D7F205',
    300: '#F2E205',
    400: '#F23322',
    500: '#262626',
    'grey-100': '#D9D9D9',
    'grey-200': '#A4A5A6',
    'grey-300': '#5C6373',
    'grey-400': '#2C3140',
    'grey-500': '#09090D',
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
    <App /></ChakraProvider>
  </React.StrictMode>,
);
