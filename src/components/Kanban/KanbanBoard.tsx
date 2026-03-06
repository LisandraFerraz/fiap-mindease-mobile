import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { IKanbanColumn } from "../../utils/models/kanban-model";
import { KanbanColumn } from "./KanbanColumn";

export default function KanbanBoard() {
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

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) return;

    const cardId = active.id;
    const targetColumnId = over.id;

    setColumns((prev) => {
      let draggedCard: any;
      let fromColumnId: string | null = null;

      const newColumns = prev.map((col) => {
        const found = col.items.find((i) => i.id === cardId);

        if (found) {
          draggedCard = found;
          fromColumnId = col.id;

          return {
            ...col,
            items: col.items.filter((i) => i.id !== cardId),
          };
        }

        return col;
      });

      const targetColumn = newColumns.find((c) => c.id === targetColumnId);

      if (targetColumn && draggedCard) {
        targetColumn.items.push({
          ...draggedCard,
          status: targetColumnId,
        });
      }

      console.log("Card:", draggedCard);
      console.log("From:", fromColumnId);
      console.log("To:", targetColumnId);

      return [...newColumns];
    });
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 20 }}>
        {columns.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </DndContext>
  );
}
