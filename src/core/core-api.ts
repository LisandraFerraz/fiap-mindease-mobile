import { environment } from "./env/environment";

export type methods = "GET" | "PATCH" | "POST" | "PUT" | "DELETE";
interface IApi {
  url: string;
  method: methods;
  body?: any;
  access_token?: string;
  tools_id?: string;
}

export async function apiFetch<T>({
  url,
  method,
  body,
  access_token,
  tools_id,
}: IApi): Promise<T> {
  const config = {
    method: method,
  };

  if (method !== "GET" && method !== "DELETE" && body) {
    Object.assign(config, { body: JSON.stringify(body) });
  }
  if (access_token) {
    Object.assign(config, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  }

  if (url.includes(":id") && tools_id) {
    url = url.replace(":id", tools_id);
  }

  const fullUrl = environment.data_api + url;

  const response = await fetch(fullUrl, config);
  const data = await response.json();
  return data;
}
