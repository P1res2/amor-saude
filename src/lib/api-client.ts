// src/lib/api-client.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string>;
  // Aceitamos um objeto no body e nós mesmos fazemos o stringify
  body?: Record<string, unknown> | unknown;
}

export async function apiClient<TResponse>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const { params, headers, body, method = "GET", ...restOptions } = options;

  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  try {
    const response = await fetch(url.toString(), {
      method,
      headers: defaultHeaders,
      // Se tiver body e for um POST/PUT, serializa para JSON
      body: body ? JSON.stringify(body) : undefined,
      ...restOptions,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Erro ${response.status}: Falha na requisição`,
      );
    }

    // Algumas APIs retornam 204 No Content no POST/DELETE
    if (response.status === 204) {
      return {} as TResponse;
    }

    return (await response.json()) as TResponse;
  } catch (error) {
    console.error(`[API Error] ${method} ${endpoint}:`, error);
    throw error;
  }
}
