import { NextResponse } from "next/server";

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

/** Maps thrown sentinel errors to safe, generic HTTP responses. */
export function routeError(error: unknown) {
  if (error instanceof Error) {
    switch (error.message) {
      case "UNAUTHENTICATED":
        return json({ error: "Please sign in to continue." }, 401);
      case "FORBIDDEN":
        return json({ error: "You do not have access to this resource." }, 403);
      case "NOT_FOUND":
        return json({ error: "We could not find that record." }, 404);
      case "PAYMENT_REQUIRED":
        return json({ error: "Payment must be confirmed before you can access the application." }, 402);
      case "ALREADY_SUBMITTED":
        return json({ error: "This application has already been submitted." }, 409);
      case "PAYLOAD_TOO_LARGE":
        return json({ error: "That file is too large." }, 413);
      case "UNSUPPORTED_TYPE":
        return json({ error: "That file type is not accepted." }, 415);
      default:
        // Never leak an unexpected internal message to the client.
        console.error("[route] unhandled error", error);
        return json({ error: "Request failed." }, 400);
    }
  }
  console.error("[route] unknown error", error);
  return json({ error: "Request failed." }, 500);
}

export async function parseJson<T extends Record<string, unknown>>(request: Request): Promise<T> {
  const body = (await request.json().catch(() => null)) as T | null;
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body.");
  }
  return body;
}
