type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiRequestOptions {
  url: string;
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

export async function apiRequest<T>({
  url,
  method = "GET",
  body,
  headers = {},
}: ApiRequestOptions): Promise<T> {
  const options: RequestInit = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    if (headers["Content-Type"] === "application/json") {
      options.body = JSON.stringify(body);
    } else {
      options.body = body;
    }
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`请求失败，状态码：${response.status}`);
  }

  return response.json();
}
