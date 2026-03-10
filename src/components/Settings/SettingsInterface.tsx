import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { IPreferenciasOptions } from "../../utils/data/settings";
import { SettingsTemplate } from "./SettingsTemplate";
import { ThemedText } from "../ThemedText";
import { useThemeMode } from "../../theme/ThemeContext";
import { FontSizeSelector } from "./FontSizeSelector";

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
      <View style={{ gap: 25 }}>
        <View style={styles.row}>
          <ThemedText type="defaultSemiBold">Modo escuro</ThemedText>
          <Switch
            trackColor={{ false: "#767577", true: "#414aaf" }}
            thumbColor={isEnabled ? "#414aaf" : "#f4f3f4"}
            onValueChange={toggleTheme}
            value={mode === "dark"}
          />
        </View>
        <View style={{ gap: 15 }}>
          <ThemedText type="defaultSemiBold">Tamanho dos textos</ThemedText>
          <FontSizeSelector />
        </View>
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
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 15,
    },
    divider: {
      width: "100%",
      height: 1,
      marginBottom: 15,
      backgroundColor: colors.border_color,
    },
  });
