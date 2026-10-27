const DISPLAY_RE = /^(\d{2})-(\d{2})-(\d{4})$/;
const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function displayDateToIso(display: string): string {
  const match = display.trim().match(DISPLAY_RE);
  if (!match) return "";
  return `${match[3]}-${match[2]}-${match[1]}`;
}

export function isoDateToDisplay(iso: string): string {
  const match = iso.trim().match(ISO_RE);
  if (!match) return "";
  return `${match[3]}-${match[2]}-${match[1]}`;
}

export function parseDisplayDate(value: string): Date | null {
  const match = value.trim().match(DISPLAY_RE);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  date.setHours(0, 0, 0, 0);
  return date;
}

export function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function todayAsIso(): string {
  const today = startOfToday();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}
