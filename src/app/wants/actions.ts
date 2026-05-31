"use server";

import { createClient } from "@/lib/supabase/server";
import { parseImageUrls } from "@/lib/image-urls";
import { parseOptionalDate, parseTimingFlexible } from "@/lib/schedule-dates";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWant(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const category = String(formData.get("category") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "active").trim() || "active";
  const image_urls = parseImageUrls(String(formData.get("image_urls") ?? ""));
  const need_by_on = parseOptionalDate(formData.get("need_by_on"));
  const timing_flexible = parseTimingFlexible(formData.get("timing_flexible"));

  if (!title) {
    redirect("/wants/new?error=missing-title");
  }

  const { data, error } = await supabase
    .from("wants")
    .insert({
      user_id: user.id,
      title,
      description,
      category,
      status,
      image_urls,
      need_by_on,
      timing_flexible,
    })
    .select("id")
    .single();

  if (error || !data) {
    redirect(`/wants/new?error=${encodeURIComponent(error?.message ?? "insert")}`);
  }

  revalidatePath("/wants");
  redirect(`/wants/${data.id}`);
}
