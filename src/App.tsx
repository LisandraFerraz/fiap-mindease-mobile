import { Assets as NavigationAssets } from "@react-navigation/elements";
import {
  NavigationContainer,
  ThemeProvider,
  useTheme,
} from "@react-navigation/native";
import { Asset } from "expo-asset";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useColorScheme, View } from "react-native";
import { AuthProvider } from "./core/context/AuthContext";
import { RootNavigator } from "./routes/RootNavigator";
import { LightTheme, DarkTheme } from "./theme/themes";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL("/");

export function App() {
  return (
    <AuthProvider>
      <NavigationContainer
        linking={{
          enabled: true,
          prefixes: [prefix],
        }}
      >
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
