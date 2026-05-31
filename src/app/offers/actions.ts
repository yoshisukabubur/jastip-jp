"use server";

import { createClient } from "@/lib/supabase/server";
import { parseImageUrls } from "@/lib/image-urls";
import { parseOptionalDate } from "@/lib/schedule-dates";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOffer(formData: FormData) {
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
  const shop_in_japan_on = parseOptionalDate(formData.get("shop_in_japan_on"));
  const heading_to_indonesia_on = parseOptionalDate(
    formData.get("heading_to_indonesia_on"),
  );
  const order_cutoff_on = parseOptionalDate(formData.get("order_cutoff_on"));
  const schedule_note =
    String(formData.get("schedule_note") ?? "").trim() || null;

  if (!title) {
    redirect("/offers/new?error=missing-title");
  }

  const { data, error } = await supabase
    .from("offers")
    .insert({
      user_id: user.id,
      title,
      description,
      category,
      status,
      image_urls,
      shop_in_japan_on,
      heading_to_indonesia_on,
      order_cutoff_on,
      schedule_note,
    })
    .select("id")
    .single();

  if (error || !data) {
    redirect(`/offers/new?error=${encodeURIComponent(error?.message ?? "insert")}`);
  }

  revalidatePath("/offers");
  redirect(`/offers/${data.id}`);
}
