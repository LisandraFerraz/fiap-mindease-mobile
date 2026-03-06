import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";

export default function InputText({
  value,
  maxLength,
  onChange,
  editable,
  errorMessage,
  label,
  placeholder,
  required,
}: {
  value?: any;
  label: string;
  errorMessage?: string;
  maxLength?: number;
  editable?: boolean;
  placeholder: string;
  onChange?: any;
  required?: boolean;
}) {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.form_row}>
        <ThemedText
          style={styles.label}
          type={errorMessage ? "labelError" : "label"}
        >
          {label} {errorMessage}
        </ThemedText>
        <ThemedText style={required && !errorMessage ? styles.required : ""}>
          {required && !errorMessage ? "obrigatório" : ""}
        </ThemedText>
      </View>
      <TextInput
        style={[styles.text_input, errorMessage ? styles.hasError : ""]}
        value={value}
        maxLength={maxLength || undefined}
        editable={editable || true}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.text_color_light}
      />
    </View>
  );
}

const stylesSheet = (color: any) =>
  StyleSheet.create({
    container: {
      gap: 10,
      flex: 1,
    },
    label: {
      fontSize: 14,
    },
    form_row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    required: {
      color: color.text_color_opacity,
      fontSize: 12,
      textTransform: "uppercase",
    },
    text_input: {
      color: color.text_color_dark,
      backgroundColor: color.input_bg_color_primary,
      borderRadius: 10,
      elevation: 1,
      height: 50,
      fontSize: 16,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: color.border_color,
    },
    hasError: {
      borderWidth: 1,
      borderColor: color.text_color_error,
    },
  });
