export enum kanbanStatus {
  BACKLOG = "Backlog",
  AFAZER = "A fazer",
  ANDAMENTO = "Em andamento",
  CONCLUIDO = "Concluído",
}

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

export class IKanbanTodo {
  id: string = "";
  title: string = "";
  status: keyof typeof kanbanStatus = "AFAZER";
  priority: keyof typeof kanbanPriority = "BAIXO";
  dueDate: string = ""; //: Date = new Date()
  description: string = "";
  dayCountMessage: string = "";
}
