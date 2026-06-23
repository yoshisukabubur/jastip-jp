"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ListingType = "want" | "offer";

export async function createContactRequest(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const listingTypeRaw = String(formData.get("listing_type") ?? "").trim();
  const listingId = String(formData.get("listing_id") ?? "").trim();
  const returnTo = String(formData.get("return_to") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (
    (listingTypeRaw !== "want" && listingTypeRaw !== "offer") ||
    !listingId ||
    !returnTo
  ) {
    redirect("/?error=invalid-contact-request");
  }
  if (!message) {
    redirect(`${returnTo}?error=${encodeURIComponent("message-required")}`);
  }

  const listingType = listingTypeRaw as ListingType;
  const table = listingType === "want" ? "wants" : "offers";
  const { data: listing } = await supabase
    .from(table)
    .select("user_id")
    .eq("id", listingId)
    .maybeSingle();

  const recipientUserId = (listing as { user_id?: string } | null)?.user_id;
  if (!recipientUserId || recipientUserId === user.id) {
    redirect(`${returnTo}?error=${encodeURIComponent("invalid-recipient")}`);
  }

  const { error } = await supabase.from("contact_requests").insert({
    sender_id: user.id,
    recipient_user_id: recipientUserId,
    listing_type: listingType,
    listing_id: listingId,
    message,
  });

  if (error) {
    redirect(`${returnTo}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/my-listings");
  redirect(`${returnTo}?contact_request=sent`);
}
