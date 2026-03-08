import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ChecklistModel } from "../../utils/models/checklist-model";
import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { ThemedText } from "../ThemedText";
import { Icon } from "../ui/Icon";

interface IItemCardProps {
  data: ChecklistModel;
  setActive: () => void;
  onDelete: () => void;
}

export const ChecklistItemCard = ({
  data,
  onDelete,
  setActive,
}: IItemCardProps) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={setActive} style={styles.card_details}>
        <View style={[styles.checklist_color, styles[data.color]]} />
        <ThemedText>{data.name}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Icon name="delete" />
      </TouchableOpacity>
    </View>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    card: {
      paddingHorizontal: 20,
      width: 310,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignContent: "center",

      backgroundColor: color.sidenv_bg_color,
      borderRadius: 10,

      shadowColor: color.shadow_dark_grey_color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      marginRight: 10,
    },
    card_details: {
      alignItems: "center",
      flexDirection: "row",
      gap: 15,
      height: 65,
    },
    checklist_color: {
      borderRadius: 100,
      width: 20,
      height: 20,
    },
    BLUE: {
      backgroundColor: color.color_accent_blue,
    },

    YELLOW: {
      backgroundColor: color.color_accent_yellow,
    },

    RED: {
      backgroundColor: color.color_accent_red,
    },

    GREEN: {
      backgroundColor: color.color_accent_green,
    },

    ORANGE: {
      backgroundColor: color.color_accent_orange,
    },
  });
