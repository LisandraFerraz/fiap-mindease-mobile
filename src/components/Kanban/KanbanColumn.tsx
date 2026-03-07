import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  IKanbanColumn,
  IKanbanTodo,
  kanbanStatus,
} from "../../utils/models/kanban-model";
import { ThemedText } from "../ThemedText";
import { KanbanCard } from "./KanbanCard";
import { useDroppable } from "@dnd-kit/core";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo } from "react";
import { Icon } from "../ui/Icon/Icon";

export const KanbanColumn = ({
  column,
  openModal,
  deleteItem,
}: {
  column: IKanbanColumn;
  openModal: (kanbanTodo?: Partial<IKanbanTodo>) => any;
  deleteItem: (id: string) => void;
}) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      columnId: column.id,
    },
  });

  return (
    <View ref={setNodeRef as any} style={styles.column}>
      <View style={styles.columns_header}>
        <TouchableOpacity onPress={() => openModal({ status: column.id })}>
          <Icon name="add" />
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold">
          {column.title} ({column.items.length})
        </ThemedText>
      </View>

      {column.items.length > 0 ? (
        column.items.map((item: any) => (
          <KanbanCard
            key={item.id}
            deleteItem={deleteItem}
            openModal={openModal}
            card={item}
            columnId={column.id}
          />
        ))
      ) : (
        <ThemedText style={styles.empty_message}>Vazio</ThemedText>
      )}
    </View>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    columns_header: {
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
      marginBottom: 15,
    },
    column: {
      shadowColor: color.shadow_dark_grey_color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 2,

      backgroundColor: color.bg_color_container,
      paddingHorizontal: 20,
      paddingVertical: 35,
      borderRadius: 15,
      minWidth: 335,
      gap: 15,
    },
    empty_message: {
      color: color.text_color_opacity,
      textAlign: "center",
    },
  });
