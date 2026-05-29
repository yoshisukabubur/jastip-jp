import { ListingCard } from "@/components/listing-card";
import { firstImageUrl, formatRelativeTime } from "@/lib/image-urls";
import { createClient } from "@/lib/supabase/server";

type TrendRow = {
  id: string;
  title: string;
  body: string | null;
  category: string | null;
  status: string;
  image_urls: unknown;
  created_at: string;
};

export default async function TrendsPage() {
  const supabase = await createClient();
  const { data: trends } = await supabase
    .from("trends")
    .select("id, title, body, category, status, image_urls, created_at")
    .order("created_at", { ascending: false });

  const rows = (trends ?? []) as TrendRow[];

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Trends / 話題</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          コミュニティで動いている話題を短く表示します。
          Catatan tren singkat untuk melihat barang yang sedang ramai.
        </p>
      </div>
      <div className="space-y-4">
        {rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 bg-white px-4 py-10 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            まだTrends投稿がありません。Belum ada tren, tambahkan data seed dulu.
          </p>
        ) : (
          rows.map((t) => (
            <ListingCard
              key={t.id}
              title={t.title}
              category={t.category}
              status={t.status}
              excerpt={t.body}
              imageUrl={firstImageUrl(t.image_urls)}
              meta={`公開 / Dipublikasikan ${formatRelativeTime(t.created_at)}`}
            />
          ))
        )}
      </div>
    </main>
  );
}
