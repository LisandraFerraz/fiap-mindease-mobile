import { DndContext } from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import {
  IKanbanColumn,
  IKanbanTodo,
  kanbanStatus,
} from "../../utils/models/kanban-model";
import { KanbanColumn } from "./KanbanColumn";
import { UseKanban } from "../../utils/hooks/api-calls/useKanban";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { KanbanModal } from "./KanbanModal";

export default function KanbanBoard() {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const { getKanbanItems, updateKanbanItem, deleteKanbanItem } = UseKanban();

  const [kanbanColumns, setKanbanColumns] = useState<IKanbanColumn[]>([]);
  const [modalData, setModalData] = useState<IKanbanTodo>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    listKanbanItems();
  }, []);

  const listKanbanItems = () => {
    getKanbanItems().then((res: IKanbanColumn[]) => {
      setKanbanColumns(res);
    });
  };

  const deleteItem = (id: string) => {
    deleteKanbanItem(id).then((res: IKanbanColumn[]) => {
      setKanbanColumns(res);
    });
  };

  const updateKanbanItemColumn = (
    card: IKanbanTodo,
    status: keyof typeof kanbanStatus,
  ) => {
    let body: IKanbanTodo = {
      ...card,
      status: status,
    };

    updateKanbanItem(body).then((res: IKanbanColumn[]) => {
      setKanbanColumns(res);
    });
  };

  const showModal = (kanbanTodo?: IKanbanTodo) => {
    setModalData(kanbanTodo);
    setIsOpen(true);
  };

  const handleSaveData = (data?: IKanbanColumn[]) => {
    if (data) {
      setKanbanColumns(data);
      setIsOpen(false);
    }
  };

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) return;

    const activeColumn = active.data.current.columnId;
    const targetColumn = over.data.current?.columnId ?? over.id;

    if (activeColumn === targetColumn) return;

    const card = active.data.current.card;

    setKanbanColumns((prev) => {
      const newColumns = [...prev];

      const fromCol = newColumns.find((c) => c.id === activeColumn);
      const toCol = newColumns.find((c) => c.id === targetColumn);

      if (!fromCol || !toCol) return prev;

      fromCol.items = fromCol.items.filter((i) => i.id !== card.id);

      toCol.items.push({
        ...card,
        status: targetColumn,
      });

      return [...newColumns];
    });

    updateKanbanItemColumn(card, over.id);
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <ScrollView horizontal>
          <View style={styles.column_group}>
            {kanbanColumns.map((column) => (
              <KanbanColumn
                deleteItem={deleteItem}
                openModal={showModal}
                key={column.id}
                column={column}
              />
            ))}
          </View>
        </ScrollView>
      </DndContext>

      {isOpen && (
        <KanbanModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          saveData={handleSaveData}
          data={modalData}
        />
      )}
    </>
  );
}

const stylesSheet = (color: any) =>
  StyleSheet.create({
    column_group: {
      padding: 5,
      flexDirection: "row",
      gap: 10,
    },
  });
