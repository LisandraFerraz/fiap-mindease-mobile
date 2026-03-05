import UserDataStore from "../stores/user-data-store";
import { environment } from "./env/environment";

export type methods = "GET" | "PATCH" | "POST" | "PUT" | "DELETE";
interface IApi {
  url: string;
  method: methods;
  body?: any;
}

export async function apiFetch<T>({ url, method, body }: IApi): Promise<T> {
  const { accessToken, platToolsId } = UserDataStore.getState().tokens;

  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const reqBody = JSON.stringify(body);

  if (method !== "GET" && method !== "DELETE" && body) {
    Object.assign(config, { body: reqBody });
  }

  if (accessToken) {
    Object.assign(config, {
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  if (url.includes(":id") && platToolsId) {
    url = url.replace(":id", platToolsId);
  }

  const fullUrl = environment.data_api + url;

  const response = await fetch(fullUrl, config);
  const data = await response.json();

  return data;
}
