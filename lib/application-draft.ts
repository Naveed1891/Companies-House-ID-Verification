export const APPLICATION_DRAFT_STORAGE_KEY = "chidv.application-draft.v1";

export type ApplicationDraft = {
  packageSlug: string;
  application: Record<string, unknown>;
  fullName: string;
  createdAt: number;
};

function isApplicationDraft(value: unknown): value is ApplicationDraft {
  if (!value || typeof value !== "object") return false;
  const draft = value as Record<string, unknown>;
  return (
    typeof draft.packageSlug === "string" &&
    typeof draft.fullName === "string" &&
    typeof draft.createdAt === "number" &&
    Boolean(draft.application) &&
    typeof draft.application === "object" &&
    !Array.isArray(draft.application)
  );
}

export function readApplicationDraft(): ApplicationDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(APPLICATION_DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const draft: unknown = JSON.parse(raw);
    return isApplicationDraft(draft) ? draft : null;
  } catch {
    return null;
  }
}

export function saveApplicationDraft(draft: ApplicationDraft) {
  window.sessionStorage.setItem(APPLICATION_DRAFT_STORAGE_KEY, JSON.stringify(draft));
}

export function clearApplicationDraft() {
  window.sessionStorage.removeItem(APPLICATION_DRAFT_STORAGE_KEY);
}
