import { useAuth } from "../core/context/AuthContext";
// import { AppStack } from "./AppStacks";
import { AuthStack } from "./AuthStacks";
import { DarkTheme, LightTheme } from "../theme/themes";
import { ThemeProvider } from "@react-navigation/native";
import { useThemeMode } from "../theme/ThemeContext";
import { AppStack } from "./AppStacks";
import UserDataStore from "../stores/user-data-store";

export function RootNavigator() {
  const { userData } = UserDataStore();

  const { mode } = useThemeMode();

  return (
    <>
      <ThemeProvider value={mode === "light" ? DarkTheme : LightTheme}>
        {/* <AppStack /> */}
        {userData.tokens.accessToken ? <AppStack /> : <AuthStack />}
      </ThemeProvider>
    </>
  );
}
