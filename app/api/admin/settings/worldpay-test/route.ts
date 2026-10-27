import { requireStaffAdmin } from "@/lib/server/auth";
import { json, routeError } from "@/lib/server/http";
import { testWorldpayConnection } from "@/lib/server/worldpay";

export const dynamic = "force-dynamic";

/**
 * Validate the saved Worldpay credentials against the configured sandbox/live
 * environment. Staff-admin only; never returns the secret values.
 */
export async function POST() {
  try {
    await requireStaffAdmin();
    const result = await testWorldpayConnection();
    return json(result, result.ok ? 200 : 400);
  } catch (error) {
    return routeError(error);
  }
}
