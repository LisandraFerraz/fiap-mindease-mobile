import { apiFetch } from "../../../core/core-api";
import { endpoints } from "../../../core/env/endpoints";
import {
  IStickyNotesResponse,
  StickyNote,
  StickyNotesGroup,
} from "../../models/interfaces-model";

export const UseStikyNotes = async () => {
  const listAllStickyGroups = async () => {
    return await apiFetch<IStickyNotesResponse>({
      method: "GET",
      url: `${endpoints.stickyNotes}`,
    });
  };

  const listStickyNotesGroup = async (groupId: string) => {
    return await apiFetch<IStickyNotesResponse>({
      method: "GET",
      url: `${endpoints.stickyNotes}/${groupId}`,
    });
  };

  const createStickyNotesGroup = async (body: StickyNotesGroup) => {
    return await apiFetch<IStickyNotesResponse>({
      method: "POST",
      url: `${endpoints.createStickyNotesGroup}`,
      body: body,
    });
  };

  const updateStickyNotesGroup = async (
    groupId: string,
    body: Partial<StickyNotesGroup>,
  ) => {
    return await apiFetch<IStickyNotesResponse>({
      method: "PATCH",
      url: `${endpoints.stickyNotes}/${groupId}/atualiza-sticky-note-group`,
      body: body,
    });
  };

  const addStickyNote = async (groupId: string, body: StickyNote) => {
    return await apiFetch<IStickyNotesResponse>({
      method: "POST",
      url: `${endpoints.stickyNotes}/${groupId}/novo-sticky-note`,
      body: body,
    });
  };

  const updateStickyNote = async (
    groupId: string,
    body: Partial<StickyNote>,
    noteId: string,
  ) => {
    return await apiFetch<IStickyNotesResponse>({
      method: "PATCH",
      url: `${endpoints.stickyNotes}/${groupId}/atualiza-sticky-note/${noteId}`,
      body: body,
    });
  };

  const deleteStickyNotesGroup = async (groupId: string) => {
    return await apiFetch<IStickyNotesResponse>({
      method: "DELETE",
      url: `${endpoints.deleteStickyNotesGroup}/${groupId}`,
    });
  };

  const deleteStickyNote = async (groupId: string, noteId: string) => {
    return await apiFetch<IStickyNotesResponse>({
      method: "DELETE",
      url: `${endpoints.stickyNotes}/${groupId}/deleta-sticky-note/${noteId}`,
    });
  };

  return {
    listStickyNotesGroup,
    createStickyNotesGroup,
    updateStickyNotesGroup,
    addStickyNote,
    updateStickyNote,
    deleteStickyNotesGroup,
    deleteStickyNote,
  };
};
