export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

function readErrorPayload(data: unknown): { message: string; code?: string } {
  if (!data || typeof data !== "object") {
    return { message: "Request failed." };
  }
  const payload = data as {
    error?: string | { code?: string; message?: string };
    message?: string;
  };

  if (typeof payload.error === "string" && payload.error.trim()) {
    return { message: payload.error.trim() };
  }

  if (payload.error && typeof payload.error === "object") {
    const message = payload.error.message?.trim() || "Request failed.";
    return { message, code: payload.error.code };
  }

  if (typeof payload.message === "string" && payload.message.trim()) {
    return { message: payload.message.trim() };
  }

  return { message: "Request failed." };
}

export async function apiFetch<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const data = (await response.json().catch(() => ({}))) as T;
  if (!response.ok) {
    const parsed = readErrorPayload(data);
    throw new ApiClientError(parsed.message, parsed.code, response.status);
  }
  return data;
}
