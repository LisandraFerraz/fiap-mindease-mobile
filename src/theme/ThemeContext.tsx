import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { fontScale } from "../utils/data/default-fontsizes";
import { FontTokens } from "../utils/models/fontsize-tokens";

type ThemeMode = "light" | "dark";
type FontSizeMode = "default-text" | "sm-text" | "lg-text" | "xl-text";

interface ThemeContextType {
  mode: ThemeMode;
  fontSize: FontSizeMode;
  fonts: FontTokens;
  toggleTheme: () => void;
  setFontSize: (size: FontSizeMode) => void;
}

const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProviderCustom({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [fontSize, setFontSize] = useState<FontSizeMode>("default-text");

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const fonts = useMemo(() => fontScale[fontSize], [fontSize]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        fontSize,
        fonts,
        toggleTheme,
        setFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeContext);
