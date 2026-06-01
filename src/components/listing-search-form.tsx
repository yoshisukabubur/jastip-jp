import Link from "next/link";

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950";

export function ListingSearchForm({
  basePath,
  q,
  category,
  status,
  statusOptions,
}: {
  basePath: "/wants" | "/offers";
  q: string;
  category: string;
  status: string;
  statusOptions: { value: string; label: string }[];
}) {
  const hasFilters = Boolean(q || category || status);

  return (
    <form method="get" className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        検索 / Cari
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1 sm:col-span-2">
          <span className="text-xs text-zinc-500">キーワード（タイトル・説明）</span>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="例: Pokémon, snack…"
            className={inputClass}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs text-zinc-500">カテゴリ</span>
          <input
            type="text"
            name="category"
            defaultValue={category}
            placeholder="Anime, snacks…"
            className={inputClass}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs text-zinc-500">ステータス</span>
          <select name="status" defaultValue={status} className={inputClass}>
            <option value="">すべて</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          絞り込む
        </button>
        {hasFilters ? (
          <Link
            href={basePath}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            クリア
          </Link>
        ) : null}
      </div>
    </form>
  );
}
