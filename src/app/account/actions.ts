"use server";

import { sanitizeContactUrl } from "@/lib/contact-urls";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const display_name = String(formData.get("display_name") ?? "").trim() || null;
  const country_code = String(formData.get("country_code") ?? "").trim() || null;
  const bio = String(formData.get("bio") ?? "").trim() || null;
  const whatsappRaw = String(formData.get("whatsapp_url") ?? "").trim();
  const lineRaw = String(formData.get("line_url") ?? "").trim();
  const telegramRaw = String(formData.get("telegram_url") ?? "").trim();

  const whatsapp_url = whatsappRaw
    ? sanitizeContactUrl(whatsappRaw, "whatsapp")
    : null;
  const line_url = lineRaw ? sanitizeContactUrl(lineRaw, "line") : null;
  const telegram_url = telegramRaw
    ? sanitizeContactUrl(telegramRaw, "telegram")
    : null;

  if (whatsappRaw && !whatsapp_url) {
    redirect("/account?error=" + encodeURIComponent("Invalid WhatsApp URL (use wa.me links)."));
  }
  if (lineRaw && !line_url) {
    redirect("/account?error=" + encodeURIComponent("Invalid LINE URL (use line.me or lin.ee)."));
  }
  if (telegramRaw && !telegram_url) {
    redirect("/account?error=" + encodeURIComponent("Invalid Telegram URL (use t.me links)."));
  }
  const contact_note = String(formData.get("contact_note") ?? "").trim() || null;

  const { error: profileError } = await supabase
    .from("users")
    .update({
      display_name,
      country_code,
      bio,
    })
    .eq("id", user.id);

  if (profileError) {
    redirect(`/account?error=${encodeURIComponent(profileError.message)}`);
  }

  const { error: contactError } = await supabase.from("user_contacts").upsert(
    {
      user_id: user.id,
      whatsapp_url,
      line_url,
      telegram_url,
      contact_note,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (contactError) {
    redirect(`/account?error=${encodeURIComponent(contactError.message)}`);
  }

  revalidatePath("/account");
  redirect("/account?saved=1");
}
