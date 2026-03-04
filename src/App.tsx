import { Assets as NavigationAssets } from "@react-navigation/elements";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { RootNavigator } from "./routes/RootNavigator";
import { ThemeProviderCustom } from "./theme/ThemeContext";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL("/");

export function App() {
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
