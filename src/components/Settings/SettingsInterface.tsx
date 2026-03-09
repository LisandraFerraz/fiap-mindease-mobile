import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { IPreferenciasOptions } from "../../utils/data/settings";
import { SettingsTemplate } from "./SettingsTemplate";
import { ThemedText } from "../ThemedText";
import { useThemeMode } from "../../theme/ThemeContext";

interface ISInterface {
  data: IPreferenciasOptions;
}

export const SettingsInterface = ({ data }: ISInterface) => {
  const { toggleTheme, mode } = useThemeMode();
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), []);

  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  return (
    <SettingsTemplate data={data}>
      <View>
        <ThemedText>Animações ativadas</ThemedText>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsEnabled(!isEnabled)}
          value={isEnabled}
        />
      </View>
      <View>
        <ThemedText>Modo escuro</ThemedText>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={mode === "dark"}
        />
      </View>
    </SettingsTemplate>
  );
};

export const stylesSheet = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: "column",
      gap: 25,
    },
    divider: {
      width: "100%",
      height: 1,
      marginBottom: 15,
      backgroundColor: colors.border_color,
    },
  });
