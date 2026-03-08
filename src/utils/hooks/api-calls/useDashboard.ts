import { apiFetch } from "../../../core/core-api";
import { endpoints } from "../../../core/env/endpoints";
import { IDashboardRes } from "../../models/dashboard-model";

export const UseDashboard = () => {
  const listDashboardItems = async () => {
    return await apiFetch<IDashboardRes>({
      url: `${endpoints.dashboard}`,
      method: "GET",
    });
  };

  return {
    listDashboardItems,
  };
};
