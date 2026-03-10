import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { ThemedText } from "../ThemedText";

export function Button({
  name,
  disabled,
  onClick,
  color,
  customStyle,
}: {
  color?: "primary" | "secondary";
  name: string;
  disabled?: boolean;
  onClick: () => void;
  customStyle?: ViewStyle;
}) {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  return (
    <TouchableOpacity
      style={[
        customStyle,
        styles.button,
        disabled ? styles.btn_secondary : styles.btn_primary,
        color === "primary" && !disabled
          ? styles.btn_primary
          : styles.btn_secondary,
      ]}
      disabled={disabled}
      onPress={() => onClick()}
    >
      <ThemedText type="defaultSemiBold" style={styles.button_text}>
        {name}
      </ThemedText>
    </TouchableOpacity>
  );
}

const stylesSheet = (color: any) =>
  StyleSheet.create({
    button: {
      borderRadius: 100,
      elevation: 1,
      padding: 10,
      height: 45,
      justifyContent: "center",
    },
    button_text: {
      letterSpacing: 1,
      textAlign: "center",
    },

    btn_primary: {
      backgroundColor: color.btn_bg_color_primary,
    },
    btn_secondary: {
      backgroundColor: color.input_bg_color_bright,
    },
  });
