import { create } from "zustand";
import { INotifResponse } from "../utils/models/notification-model";

interface INotificationStore extends INotifResponse {
  setNotificationsData: (notifData: INotifResponse) => void;
}

const NotificationStore = create<INotificationStore>((set) => ({
  checklistNotificacoes: [],
  kanbanNotificacoes: [],
  setNotificationsData: (notifData) =>
    set(() => ({
      checklistNotificacoes: notifData.checklistNotificacoes,
      kanbanNotificacoes: notifData.kanbanNotificacoes,
    })),
}));

export default NotificationStore;
