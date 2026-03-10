import { IPreferenciasOptions } from "../../utils/data/settings";
import { ReactNode, useMemo } from "react";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useTheme } from "@react-navigation/native";

interface ISInterface {
  data: IPreferenciasOptions;
  children: ReactNode;
}

export const SettingsTemplate = ({ data, children }: ISInterface) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), []);

  return (
    <View style={styles.wrapper}>
      <ThemedText type="defaultSemiBold">{data.prefTitle}</ThemedText>
      <ThemedText type="defaultThin">{data.prefSubtitle}</ThemedText>
      <View style={styles.divider} />
      {children}
    </View>
  );
};

export const stylesSheet = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: "column",
      gap: 15,
    },
    divider: {
      width: "100%",
      height: 1,
      marginBottom: 15,
      backgroundColor: colors.border_color,
    },
  });
