import { Assets as NavigationAssets } from "@react-navigation/elements";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { RootNavigator } from "./routes/RootNavigator";
import { ThemeProviderCustom, useThemeMode } from "./theme/ThemeContext";
import { DarkTheme, LightTheme } from "./theme/themes";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL("/");

export function App() {
  const { mode } = useThemeMode();

  return (
    <NavigationContainer
      linking={{
        enabled: true,
        prefixes: [prefix],
      }}
    >
      <ThemeProviderCustom>
        <RootNavigator />
      </ThemeProviderCustom>
    </NavigationContainer>
  );
}
