import { BidirectionalFlowDiagram } from "@/components/bidirectional-flow-diagram";
import Link from "next/link";

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

const EXAMPLES = [
  {
    type: "Want",
    icon: "🎯",
    title: "Cari KitKat matcha + sambal ABC",
    meta: "Jakarta → dari Jepang",
    href: "/wants",
  },
  {
    type: "Want",
    icon: "🎯",
    title: "Butuh Indomie & bumbu dari Indonesia",
    meta: "Tokyo → dari Indonesia",
    href: "/wants",
  },
  {
    type: "Offer",
    icon: "🛍️",
    title: "Belanja konbini weekend — area Shinjuku",
    meta: "Jepang → ke Indonesia",
    href: "/offers",
  },
  {
    type: "Offer",
    icon: "🛍️",
    title: "Ke Tokyo 20 Juni, bisa bawa snack ID",
    meta: "Indonesia → ke Jepang",
    href: "/offers",
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

          {/* Who are you? — directly below Dua arah */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Kamu mau apa? / あなたはどっち？
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                迷ったら、まずここから選んでください。
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm dark:border-emerald-900 dark:from-emerald-950/40 dark:to-zinc-950">
                <span className="text-3xl" aria-hidden>
                  🎯
                </span>
                <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Cari barang / 欲しいもの
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  欲しい商品を投稿して、代行してくれる人を探す。
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/wants/new"
                    className="rounded-full bg-emerald-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    投稿する / Posting
                  </Link>
                  <Link
                    href="/wants"
                    className="text-center text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    一覧を見る →
                  </Link>
                </div>
              </div>

              <div className="flex flex-col rounded-3xl border-2 border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-5 shadow-sm dark:border-zinc-700 dark:from-zinc-900/40 dark:to-zinc-950">
                <span className="text-3xl" aria-hidden>
                  🛍️
                </span>
                <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Bisa bantu / 買えます
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  代行・持ち帰りできる人は、エリアと日程を書いて出品。
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/offers/new"
                    className="rounded-full border-2 border-emerald-600 py-2.5 text-center text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
                  >
                    投稿する / Posting
                  </Link>
                  <Link
                    href="/offers"
                    className="text-center text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    一覧を見る →
                  </Link>
                </div>
              </div>
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

      {/* Examples */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Contoh posting / 投稿例
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              こんな感じで書けます。
            </p>
          </div>
          <Link
            href="/trends"
            className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            📈 Trends も見る
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {EXAMPLES.map((ex) => (
            <Link
              key={ex.title}
              href={ex.href}
              className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-emerald-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-900"
            >
              <span className="text-xl" aria-hidden>
                {ex.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  {ex.type}
                </p>
                <p className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-50">
                  {ex.title}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{ex.meta}</p>
              </div>
            </Link>
          ))}
        </div>
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
