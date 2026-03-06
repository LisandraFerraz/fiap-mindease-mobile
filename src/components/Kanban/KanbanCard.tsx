import { StyleSheet, View } from "react-native";
import { GetKanbanPriority } from "../../utils/functions/get-kanban-keys";
import { IKanbanTodo } from "../../utils/models/kanban-model";
import { useTheme } from "@react-navigation/native";
import { useEffect, useMemo } from "react";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { ThemedText } from "../ThemedText";
import { useDraggable } from "@dnd-kit/core";

export const KanbanCard = ({
  card,
  //   deleteItem,
  //   openModal,
}: {
  card: IKanbanTodo;
  //   deleteItem?: () => void;
  //   openModal?: () => void;
}) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const getPriority = () => {
    return GetKanbanPriority(card.priority);
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="card"
    >
      {card.title}
    </div>
  );

  //   return (
  //     <View style={styles.card}>
  //       <View style={styles.cardTop}>{data.title}</View>
  //       <ThemedText>{data.description}</ThemedText>
  //       <View>{data.dayCountMessage || ""}</View>
  //       {/* TROCAR POR TAG */}
  //       <ThemedText>{getPriority()}</ThemedText>
  //     </View>
  //   );
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
    },
    cardTop: {},
  });
