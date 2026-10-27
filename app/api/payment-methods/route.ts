import { json, routeError } from "@/lib/server/http";
import { resolvePaymentMethods } from "@/lib/server/settings";

export const dynamic = "force-dynamic";

/** Public: which payment methods the checkout should offer. No secrets. */
export async function GET() {
  try {
    return json({ methods: await resolvePaymentMethods() });
  } catch (error) {
    return routeError(error);
  }
}
