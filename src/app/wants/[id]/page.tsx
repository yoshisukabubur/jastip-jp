import { firstImageUrl, formatRelativeTime } from "@/lib/image-urls";
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
  users: UserEmbed;
};

function displayNameFromEmbed(users: UserEmbed): string | null {
  if (!users) return null;
  if (Array.isArray(users)) return users[0]?.display_name ?? null;
  return users.display_name;
}

export default async function WantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("wants")
    .select(
      "id, title, description, category, status, image_urls, created_at, user_id, users ( display_name )",
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  const want = data as unknown as WantDetail;
  const author = displayNameFromEmbed(want.users);
  const images = Array.isArray(want.image_urls)
    ? want.image_urls.filter((u): u is string => typeof u === "string")
    : [];

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
      </article>
    </main>
  );
}
