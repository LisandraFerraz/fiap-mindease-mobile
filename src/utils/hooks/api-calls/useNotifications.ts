import { apiFetch } from "../../../core/core-api";
import { endpoints } from "../../../core/env/endpoints";
import { INotifResponse } from "../../models/notification-model";

export const UseNotifications = () => {
  const getAllNotifications = async () => {
    return await apiFetch<INotifResponse>({
      method: "GET",
      url: `${endpoints.notifications}`,
    });
  };

  const markOneAsRead = async (id: string) => {
    return await apiFetch<INotifResponse>({
      method: "DELETE",
      url: `${endpoints.notifications}/atualizar/${id}`,
    });
  };

  const markAllAsRead = async (body: string[]) => {
    return await apiFetch<INotifResponse>({
      method: "PATCH",
      url: `${endpoints.notifications}/atualizar`,
      body,
    });
  };

  return {
    getAllNotifications,
    markOneAsRead,
    markAllAsRead,
  };
};
