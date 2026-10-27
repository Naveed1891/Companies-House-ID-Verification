import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { json, parseJson, routeError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

const WHATSAPP_RE = /^\+[1-9]\d{7,14}$/;

export async function PATCH(request: Request) {
  try {
    const user = await requireUser();
    const body = await parseJson<{ fullName?: string; whatsapp?: string; country?: string }>(request);

    const fullName = String(body.fullName ?? "").trim();
    const whatsapp = String(body.whatsapp ?? "").trim().replace(/\s+/g, "");
    const country = String(body.country ?? "").trim();

    if (fullName.length < 2) return json({ error: "Full name is required." }, 400);
    if (whatsapp && !WHATSAPP_RE.test(whatsapp)) {
      return json({ error: "Enter a WhatsApp number with country code, e.g. +447700900123." }, 400);
    }

    // Email and role are deliberately not updatable here.
    await prisma.user.update({
      where: { id: user.id },
      data: { fullName, whatsapp: whatsapp || null, country: country || null },
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
