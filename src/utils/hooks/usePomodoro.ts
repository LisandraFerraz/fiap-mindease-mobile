import { apiFetch } from "../../core/core-api";
import { endpoints } from "../../core/env/endpoints";
import { PomodoroTodo } from "../models/interfaces-model";

export const UsePomodoro = () => {
  const listPomodoroTasks = async () => {
    return await apiFetch<PomodoroTodo[]>({
      method: "GET",
      url: `${endpoints.pomodoro}`,
    });
  };

  const addPomodoroTask = async (body: PomodoroTodo) => {
    return await apiFetch<PomodoroTodo[]>({
      method: "POST",
      url: `${endpoints.addPomodoroTask}`,
      body: body,
    });
  };

  const deletePomodoroTask = async (id: string) => {
    return await apiFetch<PomodoroTodo[]>({
      method: "DELETE",
      url: `${endpoints.deletePomodoroTask}?${id}`,
    });
  };

  const updatePomodoroTaskStatus = async (body: PomodoroTodo) => {
    return await apiFetch<PomodoroTodo[]>({
      method: "PATCH",
      url: `${endpoints.atualizaPomodoroTask}`,
      body: body,
    });
  };

  return {
    listPomodoroTasks,
    addPomodoroTask,
    deletePomodoroTask,
    updatePomodoroTaskStatus,
  };
};
