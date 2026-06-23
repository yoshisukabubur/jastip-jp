"use client";

import { ScheduleDisclaimer } from "@/components/schedule-disclaimer";

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950";

export function WantScheduleFields({
  needByOn = "",
  timingFlexible = false,
}: {
  needByOn?: string;
  timingFlexible?: boolean;
}) {
  return (
    <fieldset className="space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
      <legend className="px-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        希望スケジュール / Jadwal yang diinginkan
      </legend>
      <ScheduleDisclaimer />
      <label className="block space-y-2">
        <span className="text-sm font-medium">いつまでに欲しいか / Butuh sebelum</span>
        <input
          type="date"
          name="need_by_on"
          defaultValue={needByOn}
          className={inputClass}
          onFocus={(event) => event.currentTarget.showPicker?.()}
          onClick={(event) => event.currentTarget.showPicker?.()}
        />
        <span className="block text-xs text-zinc-500 dark:text-zinc-400">
          カレンダーから日付を選択できます。
        </span>
      </label>
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="timing_flexible"
          defaultChecked={timingFlexible}
          className="mt-1 size-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
        />
        <span className="text-sm text-zinc-700 dark:text-zinc-300">
          日付は相談可 / Tanggal bisa dinegosiasikan
        </span>
      </label>
    </fieldset>
  );
}
