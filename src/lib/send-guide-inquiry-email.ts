import { GUIDE_PLANS } from "@/lib/guide-config";
import { Resend } from "resend";

export const GUIDE_INQUIRY_SUBJECT = "[JastipJP Guide] 新規問い合わせ";

export type GuideInquiryPayload = {
  name: string;
  email: string;
  contactOther: string;
  preferredDates: string;
  planId: string;
  partySize: string;
  areas: string;
  message: string;
};

function planLabel(planId: string): string {
  const plan = GUIDE_PLANS.find((p) => p.id === planId);
  if (!plan) return planId;
  return `${plan.nameJa} (¥${plan.priceYen.toLocaleString("ja-JP")})`;
}

export function buildGuideInquiryEmailText(payload: GuideInquiryPayload): string {
  const lines = [
    "JastipJP — ガイド問い合わせ（新規）",
    "",
    `お名前 / Name: ${payload.name}`,
    `メール / Email: ${payload.email}`,
    `その他連絡先: ${payload.contactOther || "—"}`,
    "",
    `希望日（土日）/ Tanggal:`,
    payload.preferredDates,
    "",
    `プラン / Paket: ${planLabel(payload.planId)}`,
    `人数 / Orang: ${payload.partySize || "1"}`,
    `エリア / Area: ${payload.areas || "—"}`,
    "",
    "メモ / Catatan:",
    payload.message || "—",
    "",
    "---",
    "返信はお客のメールアドレスへ直接お願いします（Reply-To 設定済み）。",
    `送信元フォーム: /guide`,
  ];
  return lines.join("\n");
}

export async function sendGuideInquiryEmail(
  payload: GuideInquiryPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.GUIDE_INQUIRY_TO;
  const from =
    process.env.GUIDE_INQUIRY_FROM?.trim() ||
    "JastipJP Guide <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return {
      ok: false,
      message: "RESEND_API_KEY or GUIDE_INQUIRY_TO is not configured",
    };
  }

  const resend = new Resend(apiKey);
  const text = buildGuideInquiryEmailText(payload);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: GUIDE_INQUIRY_SUBJECT,
    text,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true };
}
