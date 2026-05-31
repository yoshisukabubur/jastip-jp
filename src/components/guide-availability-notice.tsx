import { GUIDE_AVAILABILITY } from "@/lib/guide-config";

export function GuideAvailabilityNotice() {
  return (
    <section className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        受付ルール / Aturan reservasi
      </h2>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="font-medium text-emerald-800 dark:text-emerald-300">
            対応日
          </dt>
          <dd className="mt-1 text-zinc-700 dark:text-zinc-300">
            {GUIDE_AVAILABILITY.daysJa}
            <span className="mt-0.5 block text-zinc-500 dark:text-zinc-400">
              {GUIDE_AVAILABILITY.daysId}
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-emerald-800 dark:text-emerald-300">
            受付の開閉
          </dt>
          <dd className="mt-1 text-zinc-700 dark:text-zinc-300">
            {GUIDE_AVAILABILITY.openNoteJa}
            <span className="mt-0.5 block text-zinc-500 dark:text-zinc-400">
              {GUIDE_AVAILABILITY.openNoteId}
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-emerald-800 dark:text-emerald-300">
            空き確認のしかた
          </dt>
          <dd className="mt-1 text-zinc-700 dark:text-zinc-300">
            {GUIDE_AVAILABILITY.howToBookJa}
            <span className="mt-0.5 block text-zinc-500 dark:text-zinc-400">
              {GUIDE_AVAILABILITY.howToBookId}
            </span>
          </dd>
        </div>
      </dl>
      <p className="border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        掲示板（Wants / Offers）は24時間閲覧できます。案内サービスだけ土日・受付中の週に限ります。
      </p>
    </section>
  );
}
