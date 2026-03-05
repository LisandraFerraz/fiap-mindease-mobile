import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo } from "react";
import { Icon } from "./Icon/Icon";
import { ThemedText } from "../ThemedText";
import { CheckBox } from "react-native-elements";

interface ITodoCard {
  description: string;
  isCompleted: boolean;
  markAs: () => void;
  deleteItem: () => void;
}

export const TodoCard = ({
  deleteItem,
  markAs,
  description,
  isCompleted,
}: ITodoCard) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  return (
    <View style={[styles.card]}>
      <View style={styles.card_content}>
        <CheckBox onPress={markAs} checked={isCompleted} />
        <ThemedText style={isCompleted ? styles.completed_card : styles.none}>
          {description}
        </ThemedText>
      </View>
      <TouchableOpacity onPress={deleteItem}>
        <Icon name="delete" />
      </TouchableOpacity>
    </View>
  );
};
const stylesSheet = (color: any) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 50,
      backgroundColor: color.input_bg_color_primary,
      paddingRight: 10,
      borderRadius: 10,
    },
    completed_card: {
      color: color.text_color_opacity,
      textDecorationLine: "line-through",
    },
    card_content: {
      flexDirection: "row",
      alignItems: "center",
    },
    none: {},
  });
