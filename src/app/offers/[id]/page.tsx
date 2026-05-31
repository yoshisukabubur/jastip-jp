import { ReportForm } from "@/components/report-form";
import { ListingContactPanel } from "@/components/listing-contact-panel";
import { getListingContactState } from "@/lib/listing-contact";
import { DetailScheduleBlock } from "@/components/listing-schedule";
import { ScheduleDisclaimer } from "@/components/schedule-disclaimer";
import { firstImageUrl, formatRelativeTime } from "@/lib/image-urls";
import {
  offerScheduleExpired,
  offerScheduleLines,
  type OfferSchedule,
} from "@/lib/schedule-dates";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

type UserEmbed = { display_name: string | null } | { display_name: string | null }[] | null;

type OfferDetail = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  status: string;
  image_urls: unknown;
  created_at: string;
  user_id: string;
  is_seed: boolean;
  shop_in_japan_on: string | null;
  heading_to_indonesia_on: string | null;
  order_cutoff_on: string | null;
  schedule_note: string | null;
  users: UserEmbed;
};

function displayNameFromEmbed(users: UserEmbed): string | null {
  if (!users) return null;
  if (Array.isArray(users)) return users[0]?.display_name ?? null;
  return users.display_name;
}

export default async function OfferDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ report?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const supabase = await createClient();
  const {
    data: { user: viewer },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("offers")
    .select(
      "id, title, description, category, status, image_urls, created_at, user_id, is_seed, shop_in_japan_on, heading_to_indonesia_on, order_cutoff_on, schedule_note, users ( display_name )",
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  const offer = data as unknown as OfferDetail;
  const schedule: OfferSchedule = {
    shop_in_japan_on: offer.shop_in_japan_on,
    heading_to_indonesia_on: offer.heading_to_indonesia_on,
    order_cutoff_on: offer.order_cutoff_on,
    schedule_note: offer.schedule_note,
  };
  const scheduleLines = offerScheduleLines(schedule);
  const author = displayNameFromEmbed(offer.users);
  const images = Array.isArray(offer.image_urls)
    ? offer.image_urls.filter((u): u is string => typeof u === "string")
    : [];

  const contactState = await getListingContactState(
    offer.user_id,
    offer.is_seed ?? false,
  );

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/offers"
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          ← All offers
        </Link>
      </div>
      {query.report === "thanks" ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          通報を受け付けました。
        </p>
      ) : null}
      <article className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-wrap gap-2">
          {offer.category ? (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              {offer.category}
            </span>
          ) : null}
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
            {offer.status}
          </span>
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{offer.title}</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Posted {formatRelativeTime(offer.created_at)}
            {author ? ` · ${author}` : " · Member"}
          </p>
        </div>
        {offer.description ? (
          <p className="whitespace-pre-wrap text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {offer.description}
          </p>
        ) : null}
        <ScheduleDisclaimer />
        <DetailScheduleBlock
          lines={scheduleLines}
          expired={offerScheduleExpired(schedule)}
        />
        {images.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {images.map((src) => (
              <div
                key={src}
                className="overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        ) : firstImageUrl(offer.image_urls) ? (
          <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={firstImageUrl(offer.image_urls)!}
              alt=""
              className="w-full object-cover"
            />
          </div>
        ) : null}
        <ListingContactPanel
          listingType="offer"
          listingId={offer.id}
          state={contactState}
        />
        <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
            通報 / Report
          </h2>
          <div className="mt-3">
            <ReportForm
              listingType="offer"
              listingId={offer.id}
              returnTo={`/offers/${offer.id}`}
              signedIn={Boolean(viewer)}
            />
          </div>
        </section>
      </article>
    </main>
  );
}
