"use server";

import { createClient } from "@/lib/supabase/server";
import { templateImageById } from "@/lib/listing-media";
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
  const templateImageId = String(formData.get("template_image_id") ?? "").trim();
  const customImageUrl = String(formData.get("custom_image_url") ?? "").trim();
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
  const template = templateImageById(templateImageId);
  if (!template) {
    redirect("/offers/new?error=template-required");
  }
  const image_urls = customImageUrl ? [customImageUrl, template.url] : [template.url];

  const { data, error } = await supabase
    .from("offers")
    .insert({
      user_id: user.id,
      title,
      description,
      category,
      status: "active",
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
  redirect(`/offers/${data.id}?created=1`);
}

function offerFieldsFromForm(formData: FormData) {
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
    shop_in_japan_on: parseOptionalDate(formData.get("shop_in_japan_on")),
    heading_to_indonesia_on: parseOptionalDate(
      formData.get("heading_to_indonesia_on"),
    ),
    order_cutoff_on: parseOptionalDate(formData.get("order_cutoff_on")),
    schedule_note: String(formData.get("schedule_note") ?? "").trim() || null,
  };
}

export async function updateOffer(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/offers?error=missing-id");

  const fields = offerFieldsFromForm(formData);
  if (!fields.title) {
    redirect(`/offers/${id}/edit?error=missing-title`);
  }
  if (!fields.image_urls.length) {
    redirect(`/offers/${id}/edit?error=template-required`);
  }

  const { error } = await supabase
    .from("offers")
    .update(fields)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    redirect(`/offers/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/offers");
  revalidatePath(`/offers/${id}`);
  redirect(`/offers/${id}?saved=1`);
}

export async function deleteOffer(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/offers");

  const { error } = await supabase
    .from("offers")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    redirect(`/offers/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/offers");
  redirect("/offers?deleted=1");
}
