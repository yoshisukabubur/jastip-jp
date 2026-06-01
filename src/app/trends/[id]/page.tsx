import { ReportForm } from "@/components/report-form";
import { firstImageUrl, formatRelativeTime } from "@/lib/image-urls";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

type UserEmbed = { display_name: string | null } | { display_name: string | null }[] | null;

type TrendDetail = {
  id: string;
  title: string;
  body: string | null;
  category: string | null;
  status: string;
  image_urls: unknown;
  created_at: string;
  user_id: string;
  is_seed: boolean;
  users: UserEmbed;
};

function displayNameFromEmbed(users: UserEmbed): string | null {
  if (!users) return null;
  if (Array.isArray(users)) return users[0]?.display_name ?? null;
  return users.display_name;
}

export default async function TrendDetailPage({
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
    .from("trends")
    .select(
      "id, title, body, category, status, image_urls, created_at, user_id, is_seed, users ( display_name )",
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const trend = data as unknown as TrendDetail;
  const author = displayNameFromEmbed(trend.users);
  const images = Array.isArray(trend.image_urls)
    ? trend.image_urls.filter((u): u is string => typeof u === "string")
    : [];

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <Link
        href="/trends"
        className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
      >
        ← Trends
      </Link>

      {query.report === "thanks" ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          通報を受け付けました。
        </p>
      ) : null}

      <article className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-wrap gap-2">
          {trend.category ? (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              {trend.category}
            </span>
          ) : null}
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
            {trend.status}
          </span>
          {trend.is_seed ? (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
              サンプル
            </span>
          ) : null}
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{trend.title}</h1>
          <p className="mt-2 text-sm text-zinc-500">
            {formatRelativeTime(trend.created_at)}
            {author ? ` · ${author}` : ""}
          </p>
        </div>

        {trend.body ? (
          <p className="whitespace-pre-wrap text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {trend.body}
          </p>
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
        ) : firstImageUrl(trend.image_urls) ? (
          <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={firstImageUrl(trend.image_urls)!}
              alt=""
              className="w-full object-cover"
            />
          </div>
        ) : null}

        <p className="text-xs text-zinc-500">
          話題のメモです。取引は Wants / Offers から。{" "}
          <Link href="/safety" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
            安全ガイド
          </Link>
        </p>
      </article>

      <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
          通報
        </h2>
        <div className="mt-3">
          <ReportForm
            listingType="trend"
            listingId={trend.id}
            returnTo={`/trends/${trend.id}`}
            signedIn={Boolean(viewer)}
          />
        </div>
      </section>
    </main>
  );
}
