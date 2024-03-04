import { StatusBar } from "react-native";
import { ThemeProvider } from "@shopify/restyle";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

import { theme } from "./src/theme";

import { AccountProvider } from "./src/contexts/AccountFormContext";

import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <AccountProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {fontsLoaded && <Routes />}
      </AccountProvider>
    </ThemeProvider>
  );
}
