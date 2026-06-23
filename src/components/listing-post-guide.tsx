export function ListingPostGuide({
  tips,
}: {
  tips: string[];
}) {
  return (
    <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
        Tips posting / Tips menulis
      </p>
      <ul className="mt-2 space-y-1.5 text-sm text-emerald-950/90 dark:text-emerald-100/90">
        {tips.map((tip) => (
          <li key={tip} className="flex gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">·</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
