import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16 sm:px-6 sm:py-24">
      <section className="max-w-2xl space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
          Jastip Community / Komunitas Jastip
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          欲しいもの・買えるもの・今のトレンドを、ここでつなぐ。
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          JastipJP は、WANT / OFFER / TREND をつなぐ軽量掲示板です。
          Komunitas kecil pun bisa mulai cepat dan aman.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/wants"
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
          >
            Wants を見る
          </Link>
          <Link
            href="/offers"
            className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-500"
          >
            Offers を見る
          </Link>
          <Link
            href="/trends"
            className="rounded-full border border-transparent px-5 py-2.5 text-sm font-medium text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-300"
          >
            Trends を見る
          </Link>
        </div>
      </section>

      <Link
        href="/guide"
        className="block rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-emerald-900 dark:from-emerald-950/40 dark:to-zinc-950"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
          New / Baru
        </p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          東京案内（予約制）/ Tur Tokyo dengan host
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          管理人がインドネシア向けにスポット案内。土日のみ・予約制。1日 ¥18,000〜（ガイド料のみ・実費別）
        </p>
        <span className="mt-4 inline-block text-sm font-medium text-emerald-700 dark:text-emerald-400">
          Guide を見る / Lihat →
        </span>
      </Link>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          {
            title: "Wants / 欲しい",
            body: "日本から買ってほしい商品を投稿。Tulis barang titipan yang kamu cari.",
            href: "/wants",
          },
          {
            title: "Offers / 買えます",
            body: "代行できる商品を掲載。Tawarkan barang yang bisa kamu belikan dari Jepang.",
            href: "/offers",
          },
          {
            title: "Trends / 話題",
            body: "今の人気を短くチェック。Lihat tren komunitas terbaru secara cepat.",
            href: "/trends",
          },
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-900"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {card.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {card.body}
            </p>
            <span className="mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Open / Buka →
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
