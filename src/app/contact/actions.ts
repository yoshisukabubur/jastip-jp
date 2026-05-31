"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const REASONS = new Set([
  "scam",
  "spam",
  "misleading",
  "harassment",
  "other",
]);

export async function submitReport(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const listing_type = String(formData.get("listing_type") ?? "other").trim();
  const listing_id_raw = String(formData.get("listing_id") ?? "").trim();
  const reason = String(formData.get("reason") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim() || null;
  const returnTo = String(formData.get("return_to") ?? "/safety").trim() || "/safety";

  if (!REASONS.has(reason)) {
    redirect(`${returnTo}?report=invalid`);
  }
  if (!["want", "offer", "trend", "user", "other"].includes(listing_type)) {
    redirect(`${returnTo}?report=invalid`);
  }

  const listing_id = listing_id_raw || null;

  const { error } = await supabase.from("reports").insert({
    reporter_id: user.id,
    listing_type,
    listing_id,
    reason,
    details,
  });

  if (error) {
    redirect(`${returnTo}?report=error`);
  }

  revalidatePath(returnTo);
  redirect(`${returnTo}?report=thanks`);
}
