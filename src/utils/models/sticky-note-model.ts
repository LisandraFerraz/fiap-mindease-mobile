import { stickyNoteColor } from "../types/app-types";

export interface IStickyNoteSizing {
  width: number;
  height: number;
}

export interface IStickyNotesResponse {
  stickyNotes: StickyNotesGroup[];
}
export class StickyNotesGroup {
  id: string = "";
  groupName: string = "";
  data: StickyNote[] = [];
}

export class StickyNote {
  id: string = "";
  description: string = "";
  title: string = "";
  color: stickyNoteColor = "BLUE";
}
