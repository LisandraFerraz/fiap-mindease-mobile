import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IKanbanTodo, kanbanStatus } from "../../utils/models/kanban-model";
import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useDraggable } from "@dnd-kit/core";
import { ThemedText } from "../ThemedText";
import { Icon } from "../ui/Icon";
import { KanbanPrioTag } from "../ui/KanbanPrioTag";

export const KanbanCard = ({
  card,
  columnId,
  deleteItem,
  openModal,
}: {
  card: IKanbanTodo;
  columnId: keyof typeof kanbanStatus;
  deleteItem: (id: string) => any;
  openModal: (
    kanbanTodo: IKanbanTodo,
    columnId: keyof typeof kanbanStatus,
  ) => any;
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

  return (
    <View style={[style, styles.card]}>
      <TouchableOpacity
        style={styles.drag_btn}
        ref={setNodeRef as any}
        {...listeners}
        {...(attributes as any)}
      >
        <Icon name="drag" />
      </TouchableOpacity>
      <View style={styles.card_body}>
        <View style={styles.card_row}>
          <ThemedText type="defaultSemiBold">{card.title}</ThemedText>
          <View style={styles.card_actions}>
            <TouchableOpacity onPress={() => deleteItem(card.id)}>
              <Icon name="delete" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openModal(card, columnId)}>
              <Icon name="edit" />
            </TouchableOpacity>
          </View>
        </View>
        <ThemedText type="thin">{card.description}</ThemedText>
        <View style={styles.card_row}>
          <ThemedText type="small">{card.dayCountMessage ?? ""}</ThemedText>
          <KanbanPrioTag
            prio={card.priority}
            style={{ paddingHorizontal: 25 }}
          />
        </View>
      </View>
    </View>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    card: {
      shadowColor: color.shadow_dark_grey_color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 2,

      flexDirection: "row",
      alignItems: "center",
      backgroundColor: color.bg_color_card,
      borderRadius: 15,
      minWidth: 285,
      maxHeight: 160,
      overflow: "hidden",
    },
    drag_btn: {
      width: 30,
      alignItems: "center",
      //   backgroundColor: color.bg_color_element_light,
      height: "100%",
      justifyContent: "center",
    },
    card_body: {
      flex: 1,
      flexDirection: "column",
      paddingVertical: 25,
      paddingHorizontal: 20,
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
  });
