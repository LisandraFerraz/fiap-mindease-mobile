import { apiFetch } from "../../core/core-api";
import { endpoints } from "../../core/env/endpoints";
import { IKanbanColumn, IKanbanTodo } from "../models/interfaces-model";

export const UseKanban = () => {
  const getKanbanItems = async () => {
    return await apiFetch<IKanbanColumn[]>({
      method: "GET",
      url: `${endpoints.kanban}`,
    });
  };

  const addNewKanbanItem = async (body: IKanbanTodo) => {
    return await apiFetch<IKanbanColumn[]>({
      method: "POST",
      url: `${endpoints.addKanbanTask}`,
      body: body,
    });
  };

  const updateKanbanItem = async (body: IKanbanTodo) => {
    return await apiFetch<IKanbanColumn[]>({
      method: "PATCH",
      url: `${endpoints.atualizaKanbanTask}`,
      body: body,
    });
  };

  const deleteKanbanItem = async (id: string) => {
    return await apiFetch<IKanbanColumn[]>({
      method: "DELETE",
      url: `${endpoints.deleteKanbanTask}/${id}`,
    });
  };

  return {
    getKanbanItems,
    addNewKanbanItem,
    updateKanbanItem,
    deleteKanbanItem,
  };
};
