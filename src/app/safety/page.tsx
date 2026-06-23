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

const PROHIBITED_ITEMS = [
  {
    category: "法令で禁止されるもの / Barang terlarang",
    items: [
      "違法薬物・危険ドラッグ / narkotika",
      "銃器・弾薬・武器類 / senjata dan amunisi",
      "偽ブランド品・海賊版 / barang palsu",
    ],
  },
  {
    category: "トラブルになりやすいもの / Barang berisiko tinggi",
    items: [
      "処方薬・医療用成分を含む商品 / obat resep",
      "アルコール・タバコ・電子タバコ / alkohol, rokok, vape",
      "生鮮食品・肉製品・植物種子 / makanan segar, daging, benih",
    ],
  },
  {
    category: "取り扱わない方針 / Tidak didukung",
    items: [
      "現金同等物（ギフト券・プリペイド） / setara uang tunai",
      "大型・重量物（配送事故リスク） / barang terlalu besar/berat",
      "真贋判定が難しい高額品 / barang mahal sulit verifikasi",
    ],
  },
];

const CUSTOMS_NOTES = [
  "化粧品・サプリ・医薬品系は成分や数量で止まることがあります。",
  "食品（肉・生もの・種子）は国や時期で規制が変わるため事前確認が必要です。",
  "高額品はインボイス価格と実物が合わないと遅延・追加確認になりやすいです。",
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

      <section className="space-y-4 rounded-3xl border border-red-200 bg-red-50/60 p-6 dark:border-red-900 dark:bg-red-950/30">
        <h2 className="text-lg font-semibold text-red-900 dark:text-red-100">
          依頼できない商品 / Barang yang tidak boleh dititipkan
        </h2>
        <p className="text-sm text-red-900/90 dark:text-red-100/90">
          下記は JastipJP で依頼・出品を受けない方針です。迷う場合は投稿前に確認してください。
        </p>
        <div className="space-y-3">
          {PROHIBITED_ITEMS.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-red-200 bg-white/80 p-4 dark:border-red-900/60 dark:bg-zinc-950/40"
            >
              <h3 className="text-sm font-semibold text-red-900 dark:text-red-100">
                {group.category}
              </h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-sky-200 bg-sky-50/60 p-6 dark:border-sky-900 dark:bg-sky-950/30">
        <h2 className="text-lg font-semibold text-sky-900 dark:text-sky-100">
          税関で注意が必要な商品 / Barang yang sering tertahan bea cukai
        </h2>
        <p className="text-sm text-sky-900/90 dark:text-sky-100/90">
          最終判断は各国税関です。投稿前に「品目・数量・価格」を相手と確認してください。
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
          {CUSTOMS_NOTES.map((item) => (
            <li key={item}>{item}</li>
          ))}
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
