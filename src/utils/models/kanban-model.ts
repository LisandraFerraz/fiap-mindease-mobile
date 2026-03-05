import { kanbanStatus } from "../types/app-types";

export enum kanbanPriority {
  BAIXO = "baixo",
  MEDIO = "médio",
  ALTO = "alto",
}

export interface IKanbanColumn {
  id: string;
  title: string;
  items: IKanbanTodo[];
}

export interface IKanbanColumns {
  backlog: IKanbanColumn;
  todo: IKanbanColumn;
  progress: IKanbanColumn;
  done: IKanbanColumn;
}

export class IKanbanTodo {
  id: string = "";
  title: string = "";
  status: kanbanStatus = "AFAZER";
  priority: keyof typeof kanbanPriority = "BAIXO";
  dueDate: Date = new Date();
  description: string = "";
  dayCountMessage: string = "";
}
