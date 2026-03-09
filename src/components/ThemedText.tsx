import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { StyleSheet, Text, type TextProps } from "react-native";
import { CustomTheme } from "../theme/utils/theme-interface";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "thin"
    | "link"
    | "label"
    | "labelError"
    | "small"
    | "subtitle";
};

export function ThemedText({
  style,
  type = "default",
  children,
  ...rest
}: ThemedTextProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  return (
    <Text
      style={[
        styles.textColor,
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "thin" ? styles.thin : undefined,
        type === "link" ? styles.link : undefined,
        type === "label" ? styles.label : undefined,
        type === "labelError" ? styles.labelError : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const stylesSheet = (color: any) =>
  StyleSheet.create({
    textColor: {
      color: color.text_color_dark,
    },
    default: {
      fontSize: 16,
      // lineHeight: 24,
    },
    defaultSemiBold: {
      fontSize: 16,
      // lineHeight: 24,
      fontWeight: "600",
    },
    title: {
      fontSize: 22,
      fontWeight: "600",
      // lineHeight: 32,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "600",
    },
    thin: {
      fontSize: 16,
      fontWeight: 300,
      color: color.text_color_light,
    },
    link: {
      // lineHeight: 30,
      fontSize: 16,
      color: color.text_color_dark,
      textDecorationLine: "underline",
      fontWeight: "400",
    },
    label: {
      fontSize: 14,
      // lineHeight: 24,
      fontWeight: "600",
      textTransform: "uppercase",
      color: color.grey,
    },
    labelError: {
      fontSize: 16,
      // lineHeight: 24,
      fontWeight: "600",
      textTransform: "uppercase",
      color: color.text_color_error,
    },
    small: {
      fontSize: 12,
      // lineHeight: 24,
      fontWeight: "600",
      textTransform: "uppercase",
    },
  });
