import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";

export default function Button({
  name,
  disabled,
  onClick,
}: {
  name: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.on_disabled : styles.on_confirm]}
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
      textTransform: "uppercase",
      fontWeight: "500",
      fontSize: 14,
      letterSpacing: 1,
      textAlign: "center",
    },
    on_confirm: {
      backgroundColor: color.btn_bg_color_primary,
    },
    on_disabled: {
      backgroundColor: color.input_bg_color_bright,
    },
  });
