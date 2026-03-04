// import { AppStack } from "./AppStacks";
import { AuthStack } from "./AuthStacks";
import { DarkTheme, LightTheme } from "../theme/themes";
import { ThemeProvider } from "@react-navigation/native";
import { useThemeMode } from "../theme/ThemeContext";
import { AppStack } from "./AppStacks";
import UserDataStore from "../stores/user-data-store";

export function RootNavigator() {
  const { tokens } = UserDataStore();

  const { mode } = useThemeMode();

  return (
    <>
      <ThemeProvider value={mode === "light" ? DarkTheme : LightTheme}>
        {/* <AppStack /> */}
        {tokens.accessToken ? <AppStack /> : <AuthStack />}
      </ThemeProvider>
    </>
  );
}
