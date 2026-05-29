import { ListingCard } from "@/components/listing-card";
import { firstImageUrl, formatRelativeTime } from "@/lib/image-urls";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

type OfferRow = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  status: string;
  image_urls: unknown;
  created_at: string;
};

export default async function OffersPage() {
  const supabase = await createClient();
  const { data: offers } = await supabase
    .from("offers")
    .select("id, title, description, category, status, image_urls, created_at")
    .order("created_at", { ascending: false });

  const rows = (offers ?? []) as OfferRow[];

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Offers / 買えます投稿</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            日本で買える商品・代行可能な出品。Penawaran proxy dari Jepang.
          </p>
        </div>
        <Link
          href="/offers/new"
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          New offer / 投稿する
        </Link>
      </div>
      <div className="space-y-4">
        {rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 bg-white px-4 py-10 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            まだOffers投稿がありません。Belum ada offers, bagikan yang bisa kamu belikan.
          </p>
        ) : (
          rows.map((o) => (
            <ListingCard
              key={o.id}
              href={`/offers/${o.id}`}
              title={o.title}
              category={o.category}
              status={o.status}
              excerpt={o.description}
              imageUrl={firstImageUrl(o.image_urls)}
              meta={`更新 / Diperbarui ${formatRelativeTime(o.created_at)}`}
            />
          ))
        )}
      </div>
    </main>
  );
}
