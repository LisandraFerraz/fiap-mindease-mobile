import { useMemo } from "react";
import { IKanbanTodo } from "../../utils/models/kanban-model";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import KanbanBoard from "../../components/Kanban/KanbanBoard";
import { ThemedText } from "../../components/ThemedText";

export function Kanban() {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const openModal = (kanbanTodo?: IKanbanTodo) => {
    console.log(kanbanTodo);
  };

  return (
    <>
      <View style={styles.container}>
        <ThemedText type="defaultSemiBold">Quadro de tarefas</ThemedText>
        <KanbanBoard openModal={openModal} />
      </View>
    </>
  );
}

const stylesSheet = (color: any) =>
  StyleSheet.create({
    container: {
      padding: 25,
      flex: 1,
      gap: 25,
    },
    kanbanBoard: {
      height: "100%",
    },
  });
