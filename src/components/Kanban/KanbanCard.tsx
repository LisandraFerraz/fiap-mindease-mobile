import { StyleSheet, TouchableOpacity, View } from "react-native";
import { GetKanbanPriority } from "../../utils/functions/get-kanban-keys";
import { IKanbanTodo, kanbanPriority } from "../../utils/models/kanban-model";
import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useDraggable } from "@dnd-kit/core";
import { ThemedText } from "../ThemedText";
import { Icon } from "../ui/Icon/Icon";

export const KanbanCard = ({
  card,
  columnId,
  deleteItem,
  openModal,
}: {
  card: IKanbanTodo;
  columnId: string;
  deleteItem?: () => void;
  openModal: (kanbanTodo: IKanbanTodo) => any;
}) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
    data: {
      card,
      columnId,
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px,0)`
      : undefined,
  };

  const prioTag = () => {
    return (
      <ThemedText
        type="defaultSemiBold"
        style={[
          styles.prio_tag,
          card.priority === "BAIXO" ? styles.prio_BAIXO : undefined,
          card.priority === "MEDIO" ? styles.prio_MEDIO : undefined,
          card.priority === "ALTO" ? styles.prio_ALTO : undefined,
        ]}
      >
        {GetKanbanPriority(card.priority)}
      </ThemedText>
    );
  };

  return (
    <View
      ref={setNodeRef as any}
      {...listeners}
      {...(attributes as any)}
      style={[style, styles.card]}
    >
      <View style={styles.card_row}>
        <ThemedText type="defaultSemiBold">{card.title}</ThemedText>
        <View style={styles.card_actions}>
          <TouchableOpacity>
            <Icon name="delete" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="edit" />
          </TouchableOpacity>
        </View>
      </View>
      <ThemedText type="thin">{card.description}</ThemedText>
      <View style={styles.card_row}>
        <ThemedText type="small">{card.dayCountMessage ?? ""}</ThemedText>
        <>{prioTag()}</>
      </View>
    </View>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: color.bg_color_card,
      borderRadius: 15,
      paddingVertical: 25,
      paddingHorizontal: 20,
      minWidth: 275,
      maxHeight: 160,
      gap: 20,
    },
    card_actions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    card_row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    prio_tag: {
      paddingHorizontal: 30,
      paddingVertical: 2,
      borderRadius: 100,
      textTransform: "capitalize",
      textAlign: "center",
    },
    prio_BAIXO: {
      backgroundColor: color.tag_bg_color_green,
      color: color.tag_text_color_green,
    },
    prio_MEDIO: {
      backgroundColor: color.tag_bg_color_yellow,
      color: color.tag_text_color_yellow,
    },
    prio_ALTO: {
      backgroundColor: color.tag_bg_color_red,
      color: color.tag_text_color_red,
    },
  });
