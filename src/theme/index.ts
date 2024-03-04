import { createTheme } from "@shopify/restyle";

const theme = createTheme({
  colors: {
    white: "#FFFFFF",

    purple: "#8257E5",

    gray_700: "#121214",
    gray_600: "#202024",
    gray_500: "#29292E",
    gray_400: "#323238",
    gray_300: "#7C7C8A",
    gray_200: "#C4C4CC",
    gray_100: "#E1E1E6",

    Danger: "#DC1637",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    defaults: {
      fontFamily: "Poppins_400Regular",
      fontSize: 16,
    },
    title: {
      fontFamily: "Poppins_700Bold",
      fontSize: 24,
    },
  },
});

type ThemeProps = typeof theme;

export { theme, ThemeProps };
