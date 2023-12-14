import { StatusBar } from "react-native";

import { AccountProvider } from "./src/contexts/AccountFormContext";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <AccountProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Routes />
    </AccountProvider>
  );
}
