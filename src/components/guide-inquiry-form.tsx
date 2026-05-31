import { submitGuideInquiry } from "@/app/guide/actions";
import { ScheduleDisclaimer } from "@/components/schedule-disclaimer";
import { GUIDE_PLANS } from "@/lib/guide-config";
import type { ReactNode } from "react";

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950";

function FieldLabel({
  children,
  sub,
  required,
}: {
  children: ReactNode;
  sub?: string;
  required?: boolean;
}) {
  return (
    <span className="block space-y-1">
      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {children}
        {required ? (
          <span className="ml-1 text-emerald-600 dark:text-emerald-400">*</span>
        ) : null}
      </span>
      {sub ? (
        <span className="block text-xs text-zinc-500 dark:text-zinc-400">{sub}</span>
      ) : null}
    </span>
  );
}

export function GuideInquiryForm({
  error,
  submitted,
}: {
  error?: string | null;
  submitted?: boolean;
}) {
  const errorMessage =
    error === "missing"
      ? "必須項目を入力してください / Isi kolom wajib."
      : error === "email"
        ? "メール形式を確認してください / Format email tidak valid."
        : error === "plan"
          ? "プランを選び直してください / Pilih paket lagi."
          : error === "not-configured"
            ? "メール送信の設定が未完了です（管理者: RESEND_API_KEY と GUIDE_INQUIRY_TO）。"
            : error === "send"
              ? "送信に失敗しました。しばらくして再試行するか LINE で連絡してください。"
              : null;

  return (
    <section
      id="inquiry"
      className="scroll-mt-20 rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/80 via-white to-white p-6 shadow-sm dark:border-emerald-900/50 dark:from-emerald-950/30 dark:via-zinc-950 dark:to-zinc-950 sm:p-8"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              Reservation / Reservasi
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              メールで問い合わせ
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              送信後、ビジネス用メールに届きます（GAS で LINE 通知などに連携できます）。
              返信は通常メールで。土日のみ・空きは都度確認です。
              <span className="mt-2 block">
                Setelah kirim, email bisnis kami menerima permintaan. Balasan via email.
              </span>
            </p>
          </div>

          <ol className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            {[
              "希望の土日（第2・第3希望も）を書く",
              "プランを選ぶ（迷ったら Full）",
              "返信を待つ（土日運用のため平日は遅れる場合あり）",
            ].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <ScheduleDisclaimer />

          <p className="rounded-xl border border-dashed border-zinc-300 bg-white/60 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
            件名は{" "}
            <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">
              [JastipJP Guide] 新規問い合わせ
            </code>{" "}
            です（Gmail フィルタに使えます）。
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-inner dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
          {submitted ? (
            <div
              className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
              role="status"
            >
              <p className="font-semibold">送信しました / Terkirim</p>
              <p className="mt-1 text-emerald-800/90 dark:text-emerald-200/90">
                ビジネス用メールに届きます。件名は{" "}
                <code className="rounded bg-emerald-100/80 px-1 dark:bg-emerald-900/50">
                  [JastipJP Guide] 新規問い合わせ
                </code>
                。返信は数日以内（土日運用）を目安にメールでお送りします。
              </p>
            </div>
          ) : null}
          {errorMessage ? (
            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
              {errorMessage}
            </p>
          ) : null}

          <form action={submitGuideInquiry} className="space-y-4">
            <label className="block space-y-2">
              <FieldLabel required sub="Nama / Name">
                お名前
              </FieldLabel>
              <input
                name="name"
                required
                autoComplete="name"
                className={inputClass}
                placeholder="例: Andi"
              />
            </label>

            <label className="block space-y-2">
              <FieldLabel required sub="Untuk balasan">
                メールアドレス
              </FieldLabel>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
              />
            </label>

            <label className="block space-y-2">
              <FieldLabel sub="LINE ID · WhatsApp · Telegram">
                その他の連絡先（任意）
              </FieldLabel>
              <input
                name="contact_other"
                className={inputClass}
                placeholder="@line_id or +62..."
              />
            </label>

            <label className="block space-y-2">
              <FieldLabel
                required
                sub="Sabtu/Minggu only — hari kerja biasanya tidak"
              >
                希望日（土日）
              </FieldLabel>
              <textarea
                name="preferred_dates"
                required
                rows={2}
                className={inputClass}
                placeholder="例: 第1希望 6/7(土) · 第2希望 6/8(日)"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2">
                <FieldLabel required>Paket / プラン</FieldLabel>
                <select name="plan" required className={inputClass} defaultValue="">
                  <option value="" disabled>
                    選択 / Pilih
                  </option>
                  {GUIDE_PLANS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nameJa} — ¥{p.priceYen.toLocaleString("ja-JP")}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block space-y-2">
                <FieldLabel sub="Orang">
                  人数
                </FieldLabel>
                <input
                  name="party_size"
                  type="number"
                  min={1}
                  max={8}
                  defaultValue={1}
                  className={inputClass}
                />
              </label>
            </div>

            <label className="block space-y-2">
              <FieldLabel sub="Asakusa, Akihabara, dll.">
                行きたいエリア・お店
              </FieldLabel>
              <input
                name="areas"
                className={inputClass}
                placeholder="浅草、秋葉原、コスメ店…"
              />
            </label>

            <label className="block space-y-2">
              <FieldLabel>メモ / Catatan</FieldLabel>
              <textarea
                name="message"
                rows={3}
                className={inputClass}
                placeholder="歩行量、子連れ、買いたいものなど"
              />
            </label>

            <label className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
              <input
                type="checkbox"
                name="agree_terms"
                required
                className="mt-0.5 size-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                土日のみ・日程は目安・ガイド料と実費は別・JastipJP は仲介のみであることに同意します。
                <span className="mt-1 block">
                  Setuju: hanya Sabtu–Minggu, tanggal perkiraan, biaya terpisah.
                </span>
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              問い合わせを送信 / Kirim permintaan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
