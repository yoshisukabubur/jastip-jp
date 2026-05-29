"use server";

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
  const whatsapp_url = String(formData.get("whatsapp_url") ?? "").trim() || null;
  const line_url = String(formData.get("line_url") ?? "").trim() || null;
  const telegram_url = String(formData.get("telegram_url") ?? "").trim() || null;
  const contact_note = String(formData.get("contact_note") ?? "").trim() || null;

  const { error } = await supabase
    .from("users")
    .update({
      display_name,
      country_code,
      bio,
      whatsapp_url,
      line_url,
      telegram_url,
      contact_note,
    })
    .eq("id", user.id);

  if (error) {
    redirect(`/account?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/account");
  redirect("/account?saved=1");
}
