import { GuideInquiryForm } from "@/components/guide-inquiry-form";
import { GuideAvailabilityNotice } from "@/components/guide-availability-notice";
import { ScheduleDisclaimer } from "@/components/schedule-disclaimer";
import {
  GUIDE_FAQ,
  GUIDE_HOST,
  GUIDE_PLANS,
  GUIDE_SPOTS,
  GUIDE_TIMELINE,
} from "@/lib/guide-config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guide — Personal Tokyo tours | JastipJP",
  description:
    "Reservation-only personal guide in Tokyo for visitors from Indonesia. Bilingual host, clear day rates in JPY.",
};

function formatYen(n: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(n);
}

function InquiryButtons() {
  const { lineUrl, whatsappUrl } = GUIDE_HOST;
  if (lineUrl || whatsappUrl) {
    return (
      <div className="flex flex-wrap gap-3">
        {lineUrl ? (
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            LINE で問い合わせ
          </a>
        ) : null}
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          >
            WhatsApp
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm dark:border-zinc-700 dark:bg-zinc-950">
      <p className="text-zinc-700 dark:text-zinc-300">
        問い合わせ用の LINE / WhatsApp URL は準備中です。
        管理人は <Link href="/account" className="font-medium text-emerald-700 underline dark:text-emerald-400">Account</Link>{" "}
        の連絡先を確認するか、掲示板からメッセージしてください。
      </p>
      <p className="text-zinc-500 dark:text-zinc-400">
        URL kontak akan ditambahkan. Cek profil host di Account atau hubungi lewat
        postingan di papan.
      </p>
    </div>
  );
}

export default async function GuidePage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="mx-auto max-w-5xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
      <section className="max-w-2xl space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
          Personal guide / Tur pribadi
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          インドネシアの方へ。管理人が東京を案内します。
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          予約制・1日1組・<strong className="font-semibold text-zinc-800 dark:text-zinc-200">基本は土日のみ</strong>
          。観光と買い物（Jastip）のプランが可能です。空き確認は下の<strong className="font-semibold">メールフォーム</strong>から。
          <span className="mt-2 block text-base">
            Tur Tokyo — reservasi, max. 1 grup/hari, biasanya hanya Sabtu–Minggu.
          </span>
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#inquiry"
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
          >
            メールで問い合わせ / Kirim email
          </a>
          <a
            href="#plans"
            className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          >
            料金を見る / Lihat harga
          </a>
        </div>
        <InquiryButtons />
      </section>

      <GuideAvailabilityNotice />

      <GuideInquiryForm
        submitted={params.submitted === "1"}
        error={params.error ?? null}
      />

      <ScheduleDisclaimer />

      <section id="plans" className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">料金（ガイド料のみ）</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            相場の目安: ハーフ 1.5〜2.5万円 / 1日 2.5〜4万円。以下は検証用の初期価格です。交通・食事・入場料は別。
            <span className="block">Kurs Rp hanya perkiraan.</span>
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {GUIDE_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            >
              {plan.badge ? (
                <span className="absolute -top-2.5 right-4 rounded-full bg-emerald-600 px-3 py-0.5 text-[11px] font-semibold text-white">
                  {plan.badge}
                </span>
              ) : null}
              <h3 className="text-lg font-semibold">{plan.nameJa}</h3>
              <p className="text-sm text-zinc-500">{plan.nameId}</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-emerald-700 dark:text-emerald-400">
                {formatYen(plan.priceYen)}
              </p>
              <p className="text-xs text-zinc-500">+ 実費 / biaya sendiri · {plan.priceIdrNote}</p>
              <p className="mt-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {plan.duration}
              </p>
              <ul className="mt-4 flex-1 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                {plan.highlights.map((h) => (
                  <li key={h}>· {h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">含む / Termasuk</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>· 同行・ルート提案</li>
            <li>· 簡単な通訳・店舗でのやりとり補助</li>
            <li>· Jastip 向けショップの提案（希望時）</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">含まない / Tidak termasuk</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>· 交通費・食事・入場料</li>
            <li>· 商品の購入代行（掲示板の Offer を利用）</li>
            <li>· 観光・配送の保証</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">行けるエリア例</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {GUIDE_SPOTS.map((spot) => (
            <div
              key={spot.title}
              className="min-w-[10rem] shrink-0 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">{spot.title}</p>
              <p className="mt-1 text-sm text-zinc-500">{spot.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">1日の流れ（例）</h2>
        <ol className="space-y-3 border-l-2 border-emerald-200 pl-6 dark:border-emerald-900">
          {GUIDE_TIMELINE.map((step) => (
            <li key={step.time} className="relative">
              <span className="absolute -left-[1.6rem] top-0.5 size-2.5 rounded-full bg-emerald-600" />
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                {step.time}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{step.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">管理人について</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-zinc-500">名前</dt>
            <dd className="text-zinc-900 dark:text-zinc-100">{GUIDE_HOST.name}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-500">言語</dt>
            <dd className="text-zinc-900 dark:text-zinc-100">{GUIDE_HOST.languages}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-500">エリア</dt>
            <dd className="text-zinc-900 dark:text-zinc-100">{GUIDE_HOST.areas}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-500">枠</dt>
            <dd className="text-zinc-900 dark:text-zinc-100">{GUIDE_HOST.slots}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-medium text-zinc-500">予約</dt>
            <dd className="text-zinc-900 dark:text-zinc-100">{GUIDE_HOST.leadDays}</dd>
          </div>
        </dl>
        <div className="mt-6">
          <InquiryButtons />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">予約の流れ</h2>
        <ol className="grid gap-4 sm:grid-cols-4">
          {[
            { step: "1", ja: "問い合わせ", id: "Hubungi" },
            { step: "2", ja: "日程・プラン確定", id: "Konfirmasi" },
            { step: "3", ja: "当日案内", id: "Tur" },
            { step: "4", ja: "ガイド料のお支払い", id: "Bayar guide" },
          ].map((s) => (
            <li
              key={s.step}
              className="rounded-2xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-950"
            >
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {s.step}
              </span>
              <p className="mt-2 text-sm font-semibold">{s.ja}</p>
              <p className="text-xs text-zinc-500">{s.id}</p>
            </li>
          ))}
        </ol>
        <p className="text-xs text-zinc-500">
          お支払い方法（振込・現地など）は確定時にご案内します。JastipJP は決済を仲介しません。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="space-y-3">
          {GUIDE_FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <summary className="cursor-pointer font-medium text-zinc-900 dark:text-zinc-100">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
        <h2 className="text-lg font-semibold">掲示板も使う / Gunakan papan Jastip</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          商品の代行・欲しいものの募集は Wants / Offers から。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/wants"
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Wants
          </Link>
          <Link
            href="/offers"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
          >
            Offers
          </Link>
        </div>
      </section>
    </main>
  );
}
