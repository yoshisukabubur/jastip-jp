import { Resend } from "resend";

const REASON_LABELS: Record<string, string> = {
  scam: "詐欺・怪しい / Scam",
  spam: "スパム / Spam",
  misleading: "虚偽・誤解を招く / Misleading",
  harassment: "嫌がらせ / Harassment",
  other: "その他 / Other",
};

export type ReportEmailPayload = {
  listingType: string;
  listingId: string | null;
  reason: string;
  details: string | null;
  reporterEmail: string | null;
  reporterId: string;
};

function reportInbox(): string | undefined {
  return (
    process.env.REPORT_TO?.trim() ||
    process.env.GUIDE_INQUIRY_TO?.trim() ||
    undefined
  );
}

export function buildReportEmailText(payload: ReportEmailPayload): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://jastip-jp.vercel.app";

  const listingUrl = payload.listingId
    ? `${base}/${payload.listingType === "offer" ? "offers" : payload.listingType === "want" ? "wants" : "trends"}/${payload.listingId}`
  : null;

  const lines = [
    "JastipJP — 新規通報",
    "",
    `種別 / Type: ${payload.listingType}`,
    `投稿 ID: ${payload.listingId ?? "—"}`,
    listingUrl ? `URL: ${listingUrl}` : null,
    `理由: ${REASON_LABELS[payload.reason] ?? payload.reason}`,
    "",
    "詳細:",
    payload.details || "—",
    "",
    `通報者 ID: ${payload.reporterId}`,
    `通報者メール: ${payload.reporterEmail ?? "—"}`,
    "",
    "Supabase → Table Editor → reports でも確認できます。",
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export async function sendReportEmail(
  payload: ReportEmailPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = reportInbox();
  const from =
    process.env.REPORT_FROM?.trim() ||
    process.env.GUIDE_INQUIRY_FROM?.trim() ||
    "JastipJP <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return {
      ok: false,
      message: "RESEND_API_KEY or REPORT_TO / GUIDE_INQUIRY_TO is not configured",
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.reporterEmail ?? undefined,
    subject: `[JastipJP] 通報 — ${payload.listingType}${payload.listingId ? ` #${payload.listingId.slice(0, 8)}` : ""}`,
    text: buildReportEmailText(payload),
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true };
}
