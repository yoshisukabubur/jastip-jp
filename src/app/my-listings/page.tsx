import { ListingCard } from "@/components/listing-card";
import { firstImageUrl, formatRelativeTime } from "@/lib/image-urls";
import { createClient } from "@/lib/supabase/server";
import { offerScheduleExpired, offerScheduleLines, wantScheduleLines } from "@/lib/schedule-dates";
import Link from "next/link";
import { redirect } from "next/navigation";

type WantRow = {
  id: string;
  title: string;
  category: string | null;
  status: string;
  description: string | null;
  image_urls: unknown;
  created_at: string;
  need_by_on: string | null;
  timing_flexible: boolean;
};

type OfferRow = {
  id: string;
  title: string;
  category: string | null;
  status: string;
  description: string | null;
  image_urls: unknown;
  created_at: string;
  shop_in_japan_on: string | null;
  heading_to_indonesia_on: string | null;
  order_cutoff_on: string | null;
  schedule_note: string | null;
};

type ContactRequestRow = {
  id: string;
  sender_id: string;
  listing_type: "want" | "offer";
  listing_id: string;
  message: string;
  created_at: string;
};

export default async function MyListingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/my-listings");

  const [{ data: wants }, { data: offers }, { data: contactRequests }] = await Promise.all([
    supabase
      .from("wants")
      .select(
        "id, title, category, status, description, image_urls, created_at, need_by_on, timing_flexible",
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("offers")
      .select(
        "id, title, category, status, description, image_urls, created_at, shop_in_japan_on, heading_to_indonesia_on, order_cutoff_on, schedule_note",
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("contact_requests")
      .select("id, sender_id, listing_type, listing_id, message, created_at")
      .eq("recipient_user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">My listings</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          自分が投稿した Wants / Offers をまとめて管理できます。
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">My wants</h2>
          <Link href="/wants/new" className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400">
            + New want
          </Link>
        </div>
        <div className="space-y-3">
          {(wants as WantRow[] | null)?.length ? (
            (wants as WantRow[]).map((want) => (
              <ListingCard
                key={want.id}
                href={`/wants/${want.id}`}
                title={want.title}
                category={want.category}
                status={want.status}
                excerpt={want.description}
                imageUrl={firstImageUrl(want.image_urls)}
                meta={`Updated ${formatRelativeTime(want.created_at)}`}
                scheduleLines={wantScheduleLines({
                  need_by_on: want.need_by_on,
                  timing_flexible: want.timing_flexible,
                })}
              />
            ))
          ) : (
            <p className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
              まだ Want 投稿はありません。
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">My offers</h2>
          <Link href="/offers/new" className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400">
            + New offer
          </Link>
        </div>
        <div className="space-y-3">
          {(offers as OfferRow[] | null)?.length ? (
            (offers as OfferRow[]).map((offer) => (
              <ListingCard
                key={offer.id}
                href={`/offers/${offer.id}`}
                title={offer.title}
                category={offer.category}
                status={offer.status}
                excerpt={offer.description}
                imageUrl={firstImageUrl(offer.image_urls)}
                meta={`Updated ${formatRelativeTime(offer.created_at)}`}
                scheduleLines={offerScheduleLines({
                  shop_in_japan_on: offer.shop_in_japan_on,
                  heading_to_indonesia_on: offer.heading_to_indonesia_on,
                  order_cutoff_on: offer.order_cutoff_on,
                  schedule_note: offer.schedule_note,
                })}
                scheduleExpired={offerScheduleExpired({
                  shop_in_japan_on: offer.shop_in_japan_on,
                  heading_to_indonesia_on: offer.heading_to_indonesia_on,
                  order_cutoff_on: offer.order_cutoff_on,
                  schedule_note: offer.schedule_note,
                })}
              />
            ))
          ) : (
            <p className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
              まだ Offer 投稿はありません。
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Incoming contact requests</h2>
        <div className="space-y-3">
          {(contactRequests as ContactRequestRow[] | null)?.length ? (
            (contactRequests as ContactRequestRow[]).map((request) => (
              <article
                key={request.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {request.listing_type.toUpperCase()} / {formatRelativeTime(request.created_at)}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
                  {request.message}
                </p>
                <Link
                  href={`/${request.listing_type === "want" ? "wants" : "offers"}/${request.listing_id}`}
                  className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  投稿を開く
                </Link>
              </article>
            ))
          ) : (
            <p className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
              まだ連絡リクエストはありません。
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
