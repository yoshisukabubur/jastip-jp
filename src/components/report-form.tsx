import { submitReport } from "@/app/contact/actions";
import Link from "next/link";

const REASONS = [
  { value: "scam", label: "詐欺・怪しい / Scam" },
  { value: "spam", label: "スパム / Spam" },
  { value: "misleading", label: "虚偽・誤解を招く / Misleading" },
  { value: "harassment", label: "嫌がらせ / Harassment" },
  { value: "other", label: "その他 / Other" },
] as const;

export function ReportForm({
  listingType,
  listingId,
  returnTo,
  signedIn,
}: {
  listingType: "want" | "offer" | "trend" | "user" | "other";
  listingId?: string;
  returnTo: string;
  signedIn: boolean;
}) {
  if (!signedIn) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        通報には{" "}
        <Link href={`/login?next=${returnTo}`} className="text-emerald-700 underline dark:text-emerald-400">
          ログイン
        </Link>{" "}
        が必要です。
      </p>
    );
  }

  return (
    <form action={submitReport} className="space-y-4">
      <input type="hidden" name="listing_type" value={listingType} />
      {listingId ? <input type="hidden" name="listing_id" value={listingId} /> : null}
      <input type="hidden" name="return_to" value={returnTo} />

      <label className="block space-y-2">
        <span className="text-sm font-medium">理由 / Reason</span>
        <select
          name="reason"
          required
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <option value="">選択してください</option>
          {REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium">詳細（任意）/ Details</span>
        <textarea
          name="details"
          rows={3}
          placeholder="状況を簡潔に"
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
        />
      </label>

      <button
        type="submit"
        className="rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
      >
        通報を送る / Submit report
      </button>
    </form>
  );
}
