export function ScheduleDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rounded-xl border border-amber-200/80 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100 ${className}`}
    >
      日程はあくまで<strong className="font-semibold">目安</strong>
      です。買い物日と届く日は一致しません。在庫・税関・便の遅れで変わる場合があります。
      <span className="mt-1 block text-amber-900/90 dark:text-amber-200/90">
        Tanggal hanya perkiraan, bukan jaminan pengiriman.
      </span>
    </p>
  );
}
