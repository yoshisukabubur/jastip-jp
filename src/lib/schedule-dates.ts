/** Parse optional YYYY-MM-DD from form; invalid → null */
export function parseOptionalDate(raw: FormDataEntryValue | null): string | null {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const d = new Date(`${s}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return s;
}

export function parseTimingFlexible(raw: FormDataEntryValue | null): boolean {
  return raw === "on" || raw === "true" || raw === "1";
}

export function formatScheduleDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isPastDate(iso: string | null | undefined): boolean {
  if (!iso) return false;
  const d = new Date(`${iso}T23:59:59`);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() < Date.now();
}

export type OfferSchedule = {
  shop_in_japan_on: string | null;
  heading_to_indonesia_on: string | null;
  order_cutoff_on: string | null;
  schedule_note: string | null;
};

export function offerScheduleLines(row: OfferSchedule): string[] {
  const lines: string[] = [];
  const shop = formatScheduleDate(row.shop_in_japan_on);
  const heading = formatScheduleDate(row.heading_to_indonesia_on);
  const cutoff = formatScheduleDate(row.order_cutoff_on);

  if (shop) {
    lines.push(`買い物予定（日本）/ Belanja di Jepang: ${shop}`);
  }
  if (heading) {
    lines.push(`インドネシア向け目安 / Perkiraan ke ID: ${heading}`);
  }
  if (cutoff) {
    lines.push(`受付締切 / Batas order: ${cutoff}`);
  }
  if (row.schedule_note?.trim()) {
    lines.push(row.schedule_note.trim());
  }
  return lines;
}

export function offerScheduleExpired(row: OfferSchedule): boolean {
  if (row.order_cutoff_on && isPastDate(row.order_cutoff_on)) return true;
  const dates = [row.shop_in_japan_on, row.heading_to_indonesia_on].filter(
    Boolean,
  ) as string[];
  if (dates.length === 0) return false;
  return dates.every((d) => isPastDate(d));
}

export type WantSchedule = {
  need_by_on: string | null;
  timing_flexible: boolean;
};

export function wantScheduleLines(row: WantSchedule): string[] {
  const lines: string[] = [];
  const needBy = formatScheduleDate(row.need_by_on);
  if (needBy) {
    lines.push(`希望期限 / Butuh sebelum: ${needBy}`);
  }
  if (row.timing_flexible) {
    lines.push("日付は相談可 / Tanggal bisa dinegosiasikan");
  }
  return lines;
}
