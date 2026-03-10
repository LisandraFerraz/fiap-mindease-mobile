import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { StyleSheet, Text, type TextProps } from "react-native";
import { CustomTheme } from "../theme/utils/theme-interface";
import { useThemeMode } from "../theme/ThemeContext";
import { FontTokens } from "../utils/models/fontsize-tokens";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "defaultThin"
    | "link"
    | "label"
    | "labelError"
    | "sectionTitle"
    | "defaultBoldOpacity";
};

export function ThemedText({
  style,
  type = "default",
  children,
  ...rest
}: ThemedTextProps) {
  const { fonts } = useThemeMode();
  const { colors } = useTheme();
  const styles = useMemo(() => stylesSheet(colors, fonts), [colors, fonts]);

  return (
    <Text
      style={[
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "defaultThin" ? styles.defaultThin : undefined,
        type === "link" ? styles.link : undefined,
        type === "label" ? styles.label : undefined,
        type === "labelError" ? styles.labelError : undefined,
        type === "sectionTitle" ? styles.sectionTitle : undefined,
        type === "defaultBoldOpacity" ? styles.defaultBoldOpacity : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const stylesSheet = (color: any, fonts: FontTokens) =>
  StyleSheet.create({
    title: {
      fontSize: fonts.size_title,
      color: color.text_color_dark,
      fontWeight: "600",
    },
    label: {
      fontSize: fonts.size_label,
      color: color.text_color_dark,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    labelError: {
      fontSize: fonts.size_label,
      color: color.text_color_error,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    default: {
      fontSize: fonts.size_text,
      color: color.text_color_dark,
      fontWeight: "400",
    },
    defaultSemiBold: {
      fontSize: fonts.size_text,
      color: color.text_color_dark,
      fontWeight: "600",
    },
    defaultBoldOpacity: {
      fontSize: fonts.size_text,
      color: color.text_color_opacity,
      fontWeight: "600",
    },
    link: {
      fontSize: fonts.size_text,
      color: color.text_color_dark,
      textDecorationLine: "underline",
      fontWeight: "400",
    },
    defaultThin: {
      fontSize: fonts.size_text,
      color: color.text_color_dark,
      fontWeight: 300,
    },
    sectionTitle: {
      fontSize: fonts.size_description,
      color: color.text_color_dark,
      fontWeight: "600",
      textTransform: "uppercase",
    },
  });
