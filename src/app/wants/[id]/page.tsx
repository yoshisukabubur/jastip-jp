import { deleteWant } from "@/app/wants/actions";
import { ListingOwnerActions } from "@/components/listing-owner-actions";
import { ReportForm } from "@/components/report-form";
import { ListingContactPanel } from "@/components/listing-contact-panel";
import { getListingContactState } from "@/lib/listing-contact";
import { DetailScheduleBlock } from "@/components/listing-schedule";
import { ScheduleDisclaimer } from "@/components/schedule-disclaimer";
import { firstImageUrl, formatRelativeTime } from "@/lib/image-urls";
import { wantScheduleLines, type WantSchedule } from "@/lib/schedule-dates";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

type UserEmbed = { display_name: string | null } | { display_name: string | null }[] | null;

type WantDetail = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  status: string;
  image_urls: unknown;
  created_at: string;
  user_id: string;
  is_seed: boolean;
  need_by_on: string | null;
  timing_flexible: boolean;
  delivery_city: string | null;
  delivery_region: string | null;
  delivery_note: string | null;
  users: UserEmbed;
};

function displayNameFromEmbed(users: UserEmbed): string | null {
  if (!users) return null;
  if (Array.isArray(users)) return users[0]?.display_name ?? null;
  return users.display_name;
}

export default async function WantDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    report?: string;
    saved?: string;
    created?: string;
    contact_request?: string;
    error?: string;
  }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const supabase = await createClient();
  const {
    data: { user: viewer },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("wants")
    .select(
      "id, title, description, category, status, image_urls, created_at, user_id, is_seed, need_by_on, timing_flexible, delivery_city, delivery_region, delivery_note, users ( display_name )",
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  const want = data as unknown as WantDetail;
  const schedule: WantSchedule = {
    need_by_on: want.need_by_on,
    timing_flexible: want.timing_flexible,
  };
  const scheduleLines = wantScheduleLines(schedule);
  const author = displayNameFromEmbed(want.users);
  const images = Array.isArray(want.image_urls)
    ? want.image_urls.filter((u): u is string => typeof u === "string")
    : [];

  const contactState = await getListingContactState(
    want.user_id,
    want.is_seed ?? false,
  );
  const isOwner = Boolean(viewer?.id && want.user_id === viewer.id);

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/wants"
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          ← All wants
        </Link>
      </div>
      {query.report === "thanks" ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          通報を受け付けました。
        </p>
      ) : null}
      {query.saved ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          保存しました。
        </p>
      ) : null}
      {query.created ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          投稿を公開しました。
        </p>
      ) : null}
      {query.contact_request === "sent" ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          連絡リクエストを送信しました。
        </p>
      ) : null}
      {query.error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {decodeURIComponent(query.error)}
        </p>
      ) : null}
      {isOwner ? (
        <ListingOwnerActions
          listingType="want"
          listingId={want.id}
          listingTitle={want.title}
          deleteAction={deleteWant}
        />
      ) : null}
      <article className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-wrap gap-2">
          {want.category ? (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              {want.category}
            </span>
          ) : null}
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
            {want.status}
          </span>
          {want.is_seed ? (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
              Contoh / サンプル
            </span>
          ) : null}
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{want.title}</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Posted {formatRelativeTime(want.created_at)}
            {author ? ` · ${author}` : " · Member"}
          </p>
        </div>
        {want.description ? (
          <p className="whitespace-pre-wrap text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {want.description}
          </p>
        ) : null}
        <ScheduleDisclaimer />
        <DetailScheduleBlock lines={scheduleLines} />
        {want.delivery_city || want.delivery_region || want.delivery_note ? (
          <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
              配送先 / Tujuan pengiriman
            </h2>
            <div className="mt-3 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              {want.delivery_city || want.delivery_region ? (
                <p>
                  {want.delivery_city ?? "-"}
                  {want.delivery_region ? `, ${want.delivery_region}` : ""}
                </p>
              ) : null}
              {want.delivery_note ? (
                <p className="whitespace-pre-wrap text-zinc-600 dark:text-zinc-400">
                  {want.delivery_note}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}
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
        ) : firstImageUrl(want.image_urls) ? (
          <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={firstImageUrl(want.image_urls)!}
              alt=""
              className="w-full object-cover"
            />
          </div>
        ) : null}
        <ListingContactPanel
          listingType="want"
          listingId={want.id}
          returnTo={`/wants/${want.id}`}
          state={contactState}
        />
        <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
            通報 / Report
          </h2>
          <div className="mt-3">
            <ReportForm
              listingType="want"
              listingId={want.id}
              returnTo={`/wants/${want.id}`}
              signedIn={Boolean(viewer)}
            />
          </div>
        </section>
      </article>
    </main>
  );
}
