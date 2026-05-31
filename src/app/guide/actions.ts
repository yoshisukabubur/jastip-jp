"use server";

import { GUIDE_PLANS } from "@/lib/guide-config";
import { sendGuideInquiryEmail } from "@/lib/send-guide-inquiry-email";
import { redirect } from "next/navigation";

const PLAN_IDS = new Set(GUIDE_PLANS.map((p) => p.id));

export async function submitGuideInquiry(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const contactOther = String(formData.get("contact_other") ?? "").trim();
  const preferredDates = String(formData.get("preferred_dates") ?? "").trim();
  const plan = String(formData.get("plan") ?? "").trim();
  const partySize = String(formData.get("party_size") ?? "").trim() || "1";
  const areas = String(formData.get("areas") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const agreed = formData.get("agree_terms") === "on";

  if (!name || !email || !preferredDates || !plan || !agreed) {
    redirect("/guide?error=missing#inquiry");
  }
  if (!PLAN_IDS.has(plan as (typeof GUIDE_PLANS)[number]["id"])) {
    redirect("/guide?error=plan#inquiry");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect("/guide?error=email#inquiry");
  }

  const result = await sendGuideInquiryEmail({
    name,
    email,
    contactOther,
    preferredDates,
    planId: plan,
    partySize,
    areas,
    message,
  });

  if (!result.ok) {
    const code =
      result.message.includes("not configured") ? "not-configured" : "send";
    redirect(`/guide?error=${code}#inquiry`);
  }

  redirect("/guide?submitted=1#inquiry");
}
