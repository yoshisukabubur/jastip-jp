import { ListingSearchForm } from "@/components/listing-search-form";
import { ListingCard } from "@/components/listing-card";
import { firstImageUrl, formatRelativeTime } from "@/lib/image-urls";
import { parseListingSearchParams } from "@/lib/listing-search";
import {
  wantScheduleLines,
  type WantSchedule,
} from "@/lib/schedule-dates";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

type WantRow = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  status: string;
  image_urls: unknown;
  created_at: string;
  need_by_on: string | null;
  timing_flexible: boolean;
};

const WANT_STATUSES = [
  { value: "active", label: "active" },
  { value: "fulfilled", label: "fulfilled" },
  { value: "closed", label: "closed" },
];

export default async function WantsPage({
  searchParams,
}: {
  searchParams: Promise<{
    deleted?: string;
    q?: string;
    category?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;
  const filters = parseListingSearchParams(params);
  const supabase = await createClient();

  let dbQuery = supabase
    .from("wants")
    .select(
      "id, title, description, category, status, image_urls, created_at, need_by_on, timing_flexible",
    );

  if (filters.category) {
    dbQuery = dbQuery.ilike("category", `%${filters.category}%`);
  }
  if (filters.status) {
    dbQuery = dbQuery.eq("status", filters.status);
  }
  if (filters.q) {
    const pattern = `%${filters.q}%`;
    dbQuery = dbQuery.or(`title.ilike.${pattern},description.ilike.${pattern}`);
  }

  const { data: wants } = await dbQuery.order("created_at", { ascending: false });
  const rows = (wants ?? []) as WantRow[];

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Wants / 欲しいもの</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            日本から買ってほしい商品の募集。Permintaan titip beli dari Jepang.
          </p>
        </div>
        <Link
          href="/wants/new"
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          New want / 投稿する
        </Link>
      </div>
      {params.deleted ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          投稿を削除しました。
        </p>
      ) : null}

      <ListingSearchForm
        basePath="/wants"
        q={filters.q}
        category={filters.category}
        status={filters.status}
        statusOptions={WANT_STATUSES}
      />

      <div className="space-y-4">
        {rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 bg-white px-4 py-10 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            {filters.hasFilters
              ? "条件に合う投稿がありません。別のキーワードを試してください。"
              : "まだWants投稿がありません。Belum ada wants, jadi yang pertama yuk."}
          </p>
        ) : (
          rows.map((w) => {
            const schedule: WantSchedule = {
              need_by_on: w.need_by_on,
              timing_flexible: w.timing_flexible,
            };
            const lines = wantScheduleLines(schedule);
            return (
              <ListingCard
                key={w.id}
                href={`/wants/${w.id}`}
                title={w.title}
                category={w.category}
                status={w.status}
                excerpt={w.description}
                imageUrl={firstImageUrl(w.image_urls)}
                scheduleLines={lines}
                meta={`更新 / Diperbarui ${formatRelativeTime(w.created_at)}`}
              />
            );
          })
        )}
      </div>
    </main>
  );
}
