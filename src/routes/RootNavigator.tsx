import { useColorScheme } from "react-native";
import { useAuth } from "../core/context/AuthContext";
import { AppStack } from "./AppStacks";
import { AuthStack } from "./Auth";
import { DarkTheme, LightTheme } from "../theme/themes";
import { ThemeProvider } from "@react-navigation/native";

export function RootNavigator() {
  const { isAuthenticated } = useAuth();

  const colorScheme = useColorScheme();

  const theme: any = colorScheme === "dark" ? DarkTheme : LightTheme;
  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </ThemeProvider>
    </>
  );
}
