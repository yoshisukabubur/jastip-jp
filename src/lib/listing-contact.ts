import { buildContactLinks } from "@/lib/contact-urls";
import { createClient } from "@/lib/supabase/server";

export type ListingType = "want" | "offer";

export type ContactPanelState =
  | { status: "login" }
  | { status: "seed" }
  | { status: "own" }
  | { status: "no-contact" }
  | { status: "ready"; links: ReturnType<typeof buildContactLinks>; contactNote: string | null };

export async function getListingContactState(
  posterUserId: string,
  isSeed: boolean,
): Promise<ContactPanelState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { status: "login" };
  if (isSeed) return { status: "seed" };
  if (posterUserId === user.id) return { status: "own" };

  const { data: contacts } = await supabase
    .from("user_contacts")
    .select("whatsapp_url, line_url, telegram_url, contact_note")
    .eq("user_id", posterUserId)
    .maybeSingle();

  const row = contacts as {
    whatsapp_url: string | null;
    line_url: string | null;
    telegram_url: string | null;
    contact_note: string | null;
  } | null;

  const links = buildContactLinks(
    row ?? { whatsapp_url: null, line_url: null, telegram_url: null },
  );

  if (links.length === 0) return { status: "no-contact" };

  return {
    status: "ready",
    links,
    contactNote: row?.contact_note ?? null,
  };
}
