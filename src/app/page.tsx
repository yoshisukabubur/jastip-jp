import { BidirectionalFlowDiagram } from "@/components/bidirectional-flow-diagram";
import Link from "next/link";

const SCENARIOS = [
  {
    flag: "🇯🇵",
    label: "日本でほしいもの",
    sublabel: "Cari di Jepang",
    example: "Indomie, sambal, bumbu…",
    type: "Want",
    href: "/wants/new",
  },
  {
    flag: "🇮🇩",
    label: "インドネシアでほしいもの",
    sublabel: "Cari di Indonesia",
    example: "KitKat, skincare, anime goods…",
    type: "Want",
    href: "/wants/new",
  },
  {
    flag: "🇯🇵",
    label: "日本で買えます",
    sublabel: "Bisa bantu di Jepang",
    example: "Belanja konbini, Don Quijote…",
    type: "Offer",
    href: "/offers/new",
  },
  {
    flag: "🇮🇩",
    label: "インドネシアで買えます",
    sublabel: "Bisa bantu dari Indonesia",
    example: "Ke Tokyo, bawa snack lokal…",
    type: "Offer",
    href: "/offers/new",
  },
] as const;

const STEPS = [
  {
    step: "1",
    title: "Posting",
    body: "Tulis barang yang dicari (Wants) atau yang bisa dibantu (Offers).",
  },
  {
    step: "2",
    title: "Hubungi",
    body: "Chat lewat WhatsApp / LINE. Kontak ada di halaman posting.",
  },
  {
    step: "3",
    title: "Sepakati sendiri",
    body: "Harga, ongkir, dan pengiriman diatur antar pengguna.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-14 px-4 py-12 sm:px-6 sm:py-20">
      {/* Hero + flow + choice */}
      <section className="space-y-8">
        <div className="space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            Jastip Community / Komunitas Jastip
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            日本とインドネシアを、
            <span className="text-emerald-700 dark:text-emerald-400"> 欲しいもの</span>
            でつなぐ。
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            JastipJP は無料の掲示板です。日本→インドネシア、インドネシア→日本、
            どちらの titip もOK。Komunitas kecil pun bisa mulai cepat.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            決済・配送の保証はありません。取引は当事者間で行います。{" "}
            <Link href="/safety" className="text-emerald-700 underline dark:text-emerald-400">
              安全ガイド
            </Link>
          </p>
        </div>

        <div className="mx-auto max-w-xl space-y-6">
          <BidirectionalFlowDiagram />

          {/* 案A: 4 examples + 2 main buttons */}
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Kamu mau apa? / あなたはどっち？
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                4つの例から近いものを探して、下のボタンで投稿。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {SCENARIOS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-2xl border p-3 transition hover:shadow-sm sm:p-4 ${
                    item.type === "Want"
                      ? "border-emerald-200/80 bg-emerald-50/50 hover:border-emerald-300 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:hover:border-emerald-800"
                      : "border-zinc-200 bg-zinc-50/50 hover:border-emerald-200 dark:border-zinc-700 dark:bg-zinc-900/30 dark:hover:border-emerald-900"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg" aria-hidden>
                      {item.flag}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide sm:text-[11px] ${
                        item.type === "Want"
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-semibold leading-snug text-zinc-900 sm:text-sm dark:text-zinc-50">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-zinc-500 sm:text-xs dark:text-zinc-400">
                    {item.sublabel}
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-zinc-600 sm:text-xs dark:text-zinc-400">
                    e.g. {item.example}
                  </p>
                </Link>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/wants/new"
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-4 text-center font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <span className="text-xl" aria-hidden>
                  🎯
                </span>
                <span>
                  欲しいものを投稿
                  <span className="mt-0.5 block text-xs font-medium text-emerald-100">
                    Posting Want
                  </span>
                </span>
              </Link>
              <Link
                href="/offers/new"
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-600 bg-white px-4 py-4 text-center font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50 dark:bg-zinc-950 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
              >
                <span className="text-xl" aria-hidden>
                  🛍️
                </span>
                <span>
                  買えますを投稿
                  <span className="mt-0.5 block text-xs font-medium text-emerald-700/80 dark:text-emerald-400/80">
                    Posting Offer
                  </span>
                </span>
              </Link>
            </div>

            <div className="flex justify-center gap-6 text-sm">
              <Link
                href="/wants"
                className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Wants 一覧 →
              </Link>
              <Link
                href="/offers"
                className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Offers 一覧 →
              </Link>
              <Link
                href="/trends"
                className="font-medium text-zinc-600 hover:underline dark:text-zinc-400"
              >
                📈 Trends
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Cara pakai / 使い方（3ステップ）
        </h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-3 font-semibold text-zinc-900 dark:text-zinc-50">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 text-center dark:border-emerald-900 dark:bg-emerald-950/30 sm:p-8">
        <h2 className="text-xl font-semibold text-emerald-950 dark:text-emerald-100">
          Siap coba? / 試してみる
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-emerald-900/80 dark:text-emerald-100/80">
          無料・ベータ版です。まずは投稿を1件見るか、自分で投稿してみてください。
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/wants/new"
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            + New Want
          </Link>
          <Link
            href="/offers/new"
            className="rounded-full border border-emerald-300 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50 dark:border-emerald-800 dark:bg-zinc-950 dark:text-emerald-100"
          >
            + New Offer
          </Link>
          <Link
            href="/login"
            className="rounded-full px-5 py-2.5 text-sm font-medium text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-300"
          >
            ログイン
          </Link>
        </div>
      </section>

      <p className="text-center text-xs text-zinc-500">
        来日予定の方へ —{" "}
        <Link
          href="/guide"
          className="text-zinc-600 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          週末の東京案内（予約制）
        </Link>
      </p>
    </main>
  );
}
