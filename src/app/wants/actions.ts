"use server";

import { createClient } from "@/lib/supabase/server";
import { templateImageById } from "@/lib/listing-media";
import { parseOptionalDate, parseTimingFlexible } from "@/lib/schedule-dates";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function optionalText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim() || null;
}

export async function createWant(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const category = String(formData.get("category") ?? "").trim() || null;
  const templateImageId = String(formData.get("template_image_id") ?? "").trim();
  const customImageUrl = String(formData.get("custom_image_url") ?? "").trim();
  const need_by_on = parseOptionalDate(formData.get("need_by_on"));
  const timing_flexible = parseTimingFlexible(formData.get("timing_flexible"));
  const delivery_city = optionalText(formData, "delivery_city");
  const delivery_region = optionalText(formData, "delivery_region");
  const delivery_note = optionalText(formData, "delivery_note");

  if (!title) {
    redirect("/wants/new?error=missing-title");
  }
  const template = templateImageById(templateImageId);
  if (!template) {
    redirect("/wants/new?error=template-required");
  }
  const image_urls = customImageUrl ? [customImageUrl, template.url] : [template.url];

  const { data, error } = await supabase
    .from("wants")
    .insert({
      user_id: user.id,
      title,
      description,
      category,
      status: "active",
      image_urls,
      need_by_on,
      timing_flexible,
      delivery_city,
      delivery_region,
      delivery_note,
    })
    .select("id")
    .single();

  if (error || !data) {
    redirect(`/wants/new?error=${encodeURIComponent(error?.message ?? "insert")}`);
  }

  revalidatePath("/wants");
  redirect(`/wants/${data.id}?created=1`);
}

function wantFieldsFromForm(formData: FormData) {
  const templateImageId = String(formData.get("template_image_id") ?? "").trim();
  const template = templateImageById(templateImageId);
  const customImageUrl = String(formData.get("custom_image_url") ?? "").trim();
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    category: String(formData.get("category") ?? "").trim() || null,
    status: String(formData.get("status") ?? "active").trim() || "active",
    image_urls: template
      ? customImageUrl
        ? [customImageUrl, template.url]
        : [template.url]
      : [],
    need_by_on: parseOptionalDate(formData.get("need_by_on")),
    timing_flexible: parseTimingFlexible(formData.get("timing_flexible")),
    delivery_city: optionalText(formData, "delivery_city"),
    delivery_region: optionalText(formData, "delivery_region"),
    delivery_note: optionalText(formData, "delivery_note"),
  };
}

export async function updateWant(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/wants?error=missing-id");

  const fields = wantFieldsFromForm(formData);
  if (!fields.title) {
    redirect(`/wants/${id}/edit?error=missing-title`);
  }
  if (!fields.image_urls.length) {
    redirect(`/wants/${id}/edit?error=template-required`);
  }

  const { error } = await supabase
    .from("wants")
    .update(fields)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    redirect(`/wants/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/wants");
  revalidatePath(`/wants/${id}`);
  redirect(`/wants/${id}?saved=1`);
}

export async function deleteWant(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/wants");

  const { error } = await supabase
    .from("wants")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    redirect(`/wants/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/wants");
  redirect("/wants?deleted=1");
}
