import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { theme } from "../theme";

import { AccountRoutes } from "./account.routes";

export function Routes() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.gray_600 }}>
      <NavigationContainer>
        <AccountRoutes />
      </NavigationContainer>
    </View>
  );
}
