import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IKanbanColumn, IKanbanTodo } from "../../utils/models/kanban-model";
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
}: {
  column: IKanbanColumn;
  openModal: (kanbanTodo?: IKanbanTodo) => any;
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
        <TouchableOpacity onPress={() => openModal()}>
          <Icon name="add" />
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold">
          {column.title} ({column.items.length})
        </ThemedText>
      </View>

      {column.items.map((item: any) => (
        <>
          {item ? (
            <KanbanCard
              openModal={openModal}
              key={item.id}
              card={item}
              columnId={column.id}
            />
          ) : (
            <ThemedText key={0}>Vazio...</ThemedText>
          )}
        </>
      ))}
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
      backgroundColor: color.bg_color_container,
      paddingHorizontal: 20,
      paddingVertical: 35,
      borderRadius: 15,
      minWidth: 325,
      gap: 15,
    },
  });
