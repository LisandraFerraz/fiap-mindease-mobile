import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";

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
        color === "primary" ? styles.btn_primary : styles.btn_secondary,
      ]}
      disabled={disabled}
      onPress={() => onClick()}
    >
      <Text style={styles.button_text}>{name}</Text>
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
      color: "#ffffff",
      // textTransform: "uppercase",
      fontWeight: "500",
      fontSize: 16,
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
