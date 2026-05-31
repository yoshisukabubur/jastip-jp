export function ListingSchedule({
  lines,
  expired,
}: {
  lines: string[];
  expired?: boolean;
}) {
  if (lines.length === 0 && !expired) return null;

  return (
    <div className="mt-2 space-y-1">
      {expired ? (
        <span className="inline-block rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          期限切れ / Kedaluwarsa
        </span>
      ) : null}
      {lines.map((line) => (
        <p
          key={line}
          className="text-xs leading-snug text-zinc-600 dark:text-zinc-400"
        >
          {line}
        </p>
      ))}
    </div>
  );
}

export function DetailScheduleBlock({
  lines,
  expired,
}: {
  lines: string[];
  expired?: boolean;
}) {
  if (lines.length === 0 && !expired) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        日程未記載 / Belum ada tanggal — 連絡して確認してください。
      </p>
    );
  }

  return (
    <div className="space-y-2 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        スケジュール（目安） / Jadwal (perkiraan)
      </p>
      {expired ? (
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          記載の日程は過ぎています。最新情報は投稿者に確認してください。
        </p>
      ) : null}
      <ul className="space-y-1.5 text-sm text-zinc-800 dark:text-zinc-200">
        {lines.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">·</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
