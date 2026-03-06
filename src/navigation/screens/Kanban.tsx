import { useEffect, useMemo, useState } from "react";
import { UseKanban } from "../../utils/hooks/api-calls/useKanban";
import { IKanbanColumn, IKanbanTodo } from "../../utils/models/kanban-model";
import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "../../components/Kanban/KanbanCard";
import KanbanBoard from "../../components/Kanban/KanbanBoard";

export function Kanban() {
  const {
    addNewKanbanItem,
    deleteKanbanItem,
    getKanbanItems,
    updateKanbanItem,
  } = UseKanban();

  // const [kanbanData, setKanbanData] = useState<IKanbanColumn[]>();
  const [kanbanColumns, setKanbanColumns] = useState<IKanbanColumn[]>([]);

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  useEffect(() => {}, []);

  const listKanbanItems = () => {
    getKanbanItems().then((res: IKanbanColumn[]) => {
      setKanbanColumns(res);

      console.log("listKanbanItems :: ", kanbanColumns);
    });
  };

  const [columns, setColumns] = useState<IKanbanColumn[]>([
    {
      id: "BACKLOG",
      title: "Backlog",
      items: [
        {
          id: "71e0056f-c7d3-402d-a892-20774e205a04",
          title: "Tarefa backlog 1",
          status: "BACKLOG",
          priority: "BAIXO",
          dueDate: "2026-03-06T03:00:00.000Z",
          description: "Desc Tarefa backlog 2",
          dayCountMessage: "",
        },
      ],
    },
    {
      id: "AFAZER",
      title: "A fazer",
      items: [
        {
          id: "1582e977-f004-4a22-9de3-e34d717a8d2c",
          title: "Tarefa A fazer 1",
          status: "AFAZER",
          priority: "MEDIO",
          dueDate: "2026-03-18T03:00:00.000Z",
          description: "Desc Tarefa A fazer 1",
          dayCountMessage: "Restam 13 dias",
        },
      ],
    },
    {
      id: "ANDAMENTO",
      title: "Em progresso",
      items: [
        {
          id: "18006800-2899-4399-8ea2-28d9a9a9e526",
          title: "Tarefa progresso",
          status: "ANDAMENTO",
          priority: "ALTO",
          dueDate: "2026-03-07T03:00:00.000Z",
          description: "Desc Tarefa progresso",
          dayCountMessage: "Restam 2 dias",
        },
      ],
    },
    {
      id: "CONCLUIDO",
      title: "Concluído",
      items: [],
    },
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const cardId = active.id;
    const newColumnId = over.id;

    setColumns((prev) => {
      let draggedCard: any;
      let fromColumnId: string | null = null;

      const newColumns = prev.map((col) => {
        const card = col.items.find((i) => i.id === cardId);

        if (card) {
          draggedCard = card;
          fromColumnId = col.id;

          return {
            ...col,
            items: col.items.filter((i) => i.id !== cardId),
          };
        }

        return col;
      });

      const targetColumn = newColumns.find((c) => c.id === newColumnId);

      if (targetColumn && draggedCard) {
        targetColumn.items.push({
          ...draggedCard,
          status: newColumnId,
        });
      }

      console.log("CARD:", draggedCard);
      console.log("FROM:", fromColumnId);
      console.log("TO:", newColumnId);

      return [...newColumns];
    });
  };

  return <KanbanBoard />;

  // <ScrollView horizontal></ScrollView>
  // {kanbanColumns.map((column) => (
  //   <KanbanColumn
  //     key={column.id}
  //     column={column}
  //   />
  // ))}
}

const stylesSheet = (color: any) =>
  StyleSheet.create({
    container: {
      height: 100,
      flex: 1,
      //   backgroundColor: color.bg_color_container,
    },
    kanbanBoard: {
      height: "100%",
    },

    kanbanContainer: {
      //   backgroundColor: color.bg_color_container,
    },
    // ===============

    column: {
      width: 250,
      margin: 10,
      backgroundColor: "#f4f5f7",
      padding: 10,
      borderRadius: 8,
    },

    title: {
      fontWeight: "bold",
      marginBottom: 10,
    },

    dropZone: {
      minHeight: 300,
    },

    card: {
      padding: 10,
      backgroundColor: "#fff",
      marginBottom: 10,
      borderRadius: 6,
      elevation: 2,
    },
  });
