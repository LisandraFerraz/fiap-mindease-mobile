import { apiFetch } from "../../../core/core-api";
import { endpoints } from "../../../core/env/endpoints";
import {
  Checklist,
  ChecklistItem,
  IChecklistResponse,
} from "../../models/checklist-model";

export const UseChecklist = () => {
  const listChecklists = async () => {
    return await apiFetch<IChecklistResponse>({
      method: "GET",
      url: `${endpoints.checklists}`,
    });
  };

  const createChecklist = async (body: Checklist) => {
    return await apiFetch<IChecklistResponse>({
      method: "POST",
      url: `${endpoints.createChecklist}`,
      body: body,
    });
  };

  const atualizaChecklist = async (
    checklistId: string,
    body: Partial<Checklist>,
  ) => {
    return await apiFetch<IChecklistResponse>({
      method: "PATCH",
      url: `${endpoints.checklists}/atualiza-checklist/${checklistId}`,
      body: body,
    });
  };

  const deletaChecklist = async (checkId: string) => {
    return await apiFetch<IChecklistResponse>({
      method: "DELETE",
      url: `${endpoints.deleteChecklist}/${checkId}`,
    });
  };

  const addChecklistItem = async (checkId: string, body: ChecklistItem) => {
    return await apiFetch<IChecklistResponse>({
      method: "POST",
      url: `${endpoints.checklists}/${checkId}/novo-item`,
      body: body,
    });
  };

  const atualizaChecklistItem = async (
    checklistId: string,
    body: ChecklistItem,
  ) => {
    return await apiFetch<IChecklistResponse>({
      method: "PATCH",
      url: `${endpoints.atualizaChecklist}/${checklistId}/item/${body.id}`,
      body: body,
    });
  };

  const deletaChecklistItem = async (checklistId: string, id: string) => {
    return await apiFetch<IChecklistResponse>({
      method: "DELETE",
      url: `${endpoints.deleteChecklist}/${checklistId}/item/${id}`,
    });
  };

  return {
    listChecklists,
    createChecklist,
    atualizaChecklist,
    deletaChecklist,
    addChecklistItem,
    atualizaChecklistItem,
    deletaChecklistItem,
  };
};
