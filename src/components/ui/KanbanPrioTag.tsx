import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { GetKanbanPriority } from "../../utils/functions/get-kanban-keys";
import { kanbanPriority } from "../../utils/models/kanban-model";
import { ThemedText } from "../ThemedText";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo } from "react";

export const KanbanPrioTag = ({
  prio,
  style,
}: {
  prio: keyof typeof kanbanPriority;
  style?: StyleProp<TextStyle>;
}) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  return (
    <ThemedText
      type="label"
      style={[
        style,
        styles.prio_tag,
        prio === "BAIXO" ? styles.prio_BAIXO : undefined,
        prio === "MEDIO" ? styles.prio_MEDIO : undefined,
        prio === "ALTO" ? styles.prio_ALTO : undefined,
      ]}
    >
      {GetKanbanPriority(prio)}
    </ThemedText>
  );
};

const stylesSheet = (colors: any) =>
  StyleSheet.create({
    prio_tag: {
      paddingVertical: 4,
      borderRadius: 100,
      textAlign: "center",
    },
    prio_BAIXO: {
      backgroundColor: colors.tag_bg_color_green,
      color: colors.tag_text_color_green,
    },
    prio_MEDIO: {
      backgroundColor: colors.tag_bg_color_yellow,
      color: colors.tag_text_color_yellow,
    },
    prio_ALTO: {
      backgroundColor: colors.tag_bg_color_red,
      color: colors.tag_text_color_red,
    },
  });
