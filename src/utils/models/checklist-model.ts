import { stickyNoteColor } from "../types/app-types";

export interface IChecklistResponse {
  checklist: ChecklistModel[];
}

export class ChecklistModel {
  id: string = "";
  name: string = "";
  color: stickyNoteColor = "BLUE";
  data: ChecklistItem[] = [];
}

export class ChecklistItem {
  id: string = "";
  description: string = "";
  completed: boolean = false;
  lastUpdated: Date = new Date();
}
