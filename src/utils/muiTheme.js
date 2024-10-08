"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-inter)",
  },
  // colorSchemes: {
  //   dark: true,
  // },
  palette: {
    contrastThreshold: 4.5,
    netural: {
      25: "#FBFBFB",
      50: "#F9F9F9",
      100: "#EAEAEA",
      200: "#DFDFDF",
      300: "#C9C9C9",
      400: "#9A9A9A",
      500: "#777777",
      600: "#575757",
      700: "#3B3E3B",
      800: "#1F1E1E",
      900: "#121118",
    },
    primary: {
      25: "#F7F9FF",
      100: "#CBD7FD",
      200: "#97AFFB",
      300: "#7595FA",
      400: "#527AF9",
      main: "#324DA3",
      550: "#244095",
      600: "#010922",
      700: "#121118",
    },
    secondary: {
      100: "#E8F8FE",
      200: "#BAE9FB",
      300: "#A3E1FA",
      main: "#41C4FA",
      500: "#1391C2",
      600: "#0E6D92",
      700: "#0A4861",
    },
    tertiary: {
      100: "#FBE9F9",
      200: "#F2BEEE",
      300: "#EDA8E8",
      main: "#E57DDC",
      500: "#E900CC",
      600: "#7F1776",
      700: "#3F0B3B",
    },
    linearGradientBackground:
      "linear-gradient(48deg, rgba(26,31,45,1) 24%, rgba(18,3,16,1) 48%, rgba(35,6,32,1) 76%);",
    linearGradientBorder:
      "linear-gradient(180deg, rgba(233,0,204,1) 24%, rgba(69,232,255,1) 76%);",
  },
});

export default theme;
