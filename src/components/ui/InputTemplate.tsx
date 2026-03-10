import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../ThemedText";
import { ReactNode } from "react";

export interface ITemplateProps {
  color: object;
  label?: string;
  required?: boolean;
  children: ReactNode;
}

export const InputTemplate = ({
  color,
  label,
  required,
  children,
}: ITemplateProps) => {
  const styles = stylesSheet(color);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.label_row}>
        <ThemedText style={styles.label} type="label">
          {label}
        </ThemedText>
        <ThemedText style={required ? styles.required : ""}>
          {required ? "obrigatório" : ""}
        </ThemedText>
      </View>
      <View style={{ position: "relative" }}>{children}</View>
    </SafeAreaView>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    container: {
      zIndex: 100,
      flex: 1,
    },
    label_row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginBottom: 10,
    },
    label: {
      fontSize: 14,
    },
    select_input: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: color.text_color_dark,
      backgroundColor: color.input_bg_color_primary,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      elevation: 1,
      height: 50,
      fontSize: 16,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: color.border_color,
    },
    bottom_input: {
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    select_option: {
      padding: 10,
      backgroundColor: color.input_bg_color_primary,
      borderWidth: 1,
      borderColor: color.border_color,
    },
    required: {
      color: color.text_color_opacity,
      fontSize: 12,
      textTransform: "uppercase",
    },
  });
