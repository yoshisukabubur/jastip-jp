import { ScheduleDisclaimer } from "@/components/schedule-disclaimer";

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950";

export function OfferScheduleFields() {
  return (
    <fieldset className="space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
      <legend className="px-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        スケジュール（目安） / Jadwal (perkiraan)
      </legend>
      <ScheduleDisclaimer />
      <label className="block space-y-2">
        <span className="text-sm font-medium">
          日本で買いに行く予定日 / Rencana belanja di Jepang
        </span>
        <input type="date" name="shop_in_japan_on" className={inputClass} />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">
          インドネシア向けの目安（渡航・発送など）/ Perkiraan ke Indonesia
        </span>
        <input
          type="date"
          name="heading_to_indonesia_on"
          className={inputClass}
        />
        <span className="block text-xs text-zinc-500 dark:text-zinc-400">
          届く日の約束ではありません。便・税関で変わります。
        </span>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">受付締切 / Batas order</span>
        <input type="date" name="order_cutoff_on" className={inputClass} />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">補足（任意） / Catatan</span>
        <textarea
          name="schedule_note"
          rows={2}
          className={inputClass}
          placeholder="例: 週末のみ対応 / Hanya akhir pekan"
        />
      </label>
    </fieldset>
  );
}
