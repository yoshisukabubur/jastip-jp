import { ReportForm } from "@/components/report-form";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const RED_FLAGS = [
  "全額の先払いのみ・急かされる",
  "実績ゼロで「絶対安い」「今だけ」",
  "サイト外の別口座・連絡先だけ欲がる",
  "届かない・レシート・追跡番号を出さない",
];

const CHECKLIST = [
  "初回は小額・1点から試す",
  "見積もり（商品代・手数料・送料・関税・納期）をチャットに残す",
  "可能ならデポジット＋着荷後に残金（全額前払いは避ける）",
  "日本発送・インドネシア着は「目安」— 遅延もあり得る",
  "投稿の日程・免責を読んでから連絡する",
];

export default async function SafetyPage({
  searchParams,
}: {
  searchParams: Promise<{ report?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const params = await searchParams;

  return (
    <main className="mx-auto max-w-2xl space-y-10 px-4 py-12">
      <div>
        <Link
          href="/"
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          ← ホーム
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          安全な取引 / Safe trading
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          JastipJP は掲示板です。決済・配送の保証はしません。取引は WhatsApp 等で、
          ご自身の責任で行ってください。
        </p>
      </div>

      {params.report === "thanks" ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          通報を受け付けました。内容を確認します。
        </p>
      ) : null}
      {params.report === "error" || params.report === "invalid" ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          送信できませんでした。もう一度お試しください。
        </p>
      ) : null}

      <section className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold">おすすめの流れ</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          {CHECKLIST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 rounded-3xl border border-amber-200 bg-amber-50/60 p-6 dark:border-amber-900 dark:bg-amber-950/30">
        <h2 className="text-lg font-semibold text-amber-950 dark:text-amber-100">
          危険なサイン（赤旗）
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-amber-950/90 dark:text-amber-100/90">
          {RED_FLAGS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold">利用上の注意</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <li>連絡先の交換・取引は当事者間で行います。</li>
          <li>代行・輸入は各国の法令・税・禁制品に注意してください。</li>
          <li>不審な投稿は下のフォームから通報できます。</li>
          <li>
            <Link href="/terms" className="text-emerald-700 underline dark:text-emerald-400">
              利用規約
            </Link>
            をご確認ください。
          </li>
        </ul>
      </section>

      <section className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold">通報 / Report</h2>
        <ReportForm
          listingType="other"
          returnTo="/safety"
          signedIn={Boolean(user)}
        />
      </section>
    </main>
  );
}
