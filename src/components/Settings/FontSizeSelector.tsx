import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontSizeMode } from "../../utils/types/app-types";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo, useState } from "react";
import { useThemeMode } from "../../theme/ThemeContext";
import { ThemedText } from "../ThemedText";

export const FontSizeSelector = () => {
  const { fontSize, setFontSize } = useThemeMode();
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => styleSheet(colors), []);

  const [selected, setSelected] = useState<FontSizeMode>(fontSize);

  const fontsizeOpts: { size: FontSizeMode; label: string }[] = [
    {
      size: "sm-text",
      label: "Pequeno",
    },
    {
      size: "default-text",
      label: "Padrão",
    },
    {
      size: "lg-text",
      label: "Grande",
    },
    {
      size: "xl-text",
      label: "EXTRA G",
    },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.btn_group}>
        {fontsizeOpts.map((btn) => (
          <View style={styles.btn_label}>
            <TouchableOpacity
              onPress={() => setFontSize(btn.size)}
              style={[
                styles.btn_selector,
                btn.size === fontSize ? styles.size_selected : undefined,
              ]}
            ></TouchableOpacity>
            <ThemedText type="label">{btn.label}</ThemedText>
          </View>
        ))}
      </View>
      <View style={styles.line}></View>
    </View>
  );
};

const styleSheet = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      position: "relative",
    },
    btn_group: {
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "99%",
    },
    btn_label: {
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
    },
    line: {
      position: "absolute",
      top: 10,
      zIndex: -1,
      height: 5,
      width: "100%",
      backgroundColor: colors.border_color,
    },
    btn_selector: {
      width: 30,
      height: 30,
      borderRadius: 100,
      backgroundColor: colors.bg_color_card,
    },
    size_selected: {
      backgroundColor: colors.btn_bg_color_primary,
    },
  });
