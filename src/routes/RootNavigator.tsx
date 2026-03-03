import { useColorScheme } from "react-native";
import { useAuth } from "../core/context/AuthContext";
import { AppStack } from "./AppStacks";
import { AuthStack } from "./Auth";
import { DarkTheme, LightTheme } from "../theme/themes";
import { ThemeProvider, useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import { useThemeMode } from "../theme/ThemeContext";

export function RootNavigator() {
  const { isAuthenticated } = useAuth();

  // const colorScheme = useColorScheme();
  const { mode } = useThemeMode();

  useEffect(() => {});

  return (
    <>
      <ThemeProvider value={mode === "dark" ? DarkTheme : LightTheme}>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </ThemeProvider>
    </>
  );
}
