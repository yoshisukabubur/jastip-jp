export function BidirectionalFlowDiagram() {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Dua arah / 双方向
      </p>

      <div className="relative mx-auto mt-4 max-w-md" aria-hidden>
        <svg
          viewBox="0 0 360 160"
          className="h-auto w-full text-zinc-400"
          role="img"
          aria-label="日本とインドネシアの双方向の流れ"
        >
          {/* JP → ID */}
          <path
            d="M 72 52 C 140 28, 220 28, 288 52"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-emerald-500"
            markerEnd="url(#arrow-emerald)"
          />
          {/* ID → JP */}
          <path
            d="M 288 108 C 220 132, 140 132, 72 108"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-sky-500"
            markerEnd="url(#arrow-sky)"
          />
          <defs>
            <marker
              id="arrow-emerald"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" className="fill-emerald-500" />
            </marker>
            <marker
              id="arrow-sky"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" className="fill-sky-500" />
            </marker>
          </defs>
        </svg>

        <div className="absolute left-0 top-1/2 flex -translate-y-1/2 flex-col items-center">
          <span className="text-3xl">🇯🇵</span>
          <span className="mt-1 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">
            Japan
          </span>
        </div>
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-center">
          <span className="text-3xl">🇮🇩</span>
          <span className="mt-1 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">
            Indonesia
          </span>
        </div>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white">
            JastipJP
          </span>
        </div>
      </div>

      <div className="mt-2 space-y-2">
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2 dark:border-emerald-900 dark:bg-emerald-950/30">
          <span className="shrink-0 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            🇯🇵 → 🇮🇩
          </span>
          <div className="min-w-0 text-xs">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">
              Barang dari Jepang
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              KitKat, skincare, anime goods…
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50/80 px-3 py-2 dark:border-sky-900 dark:bg-sky-950/30">
          <span className="shrink-0 text-xs font-bold text-sky-700 dark:text-sky-400">
            🇮🇩 → 🇯🇵
          </span>
          <div className="min-w-0 text-xs">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">
              Barang dari Indonesia
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              Indomie, sambal, snack lokal…
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-zinc-500 dark:text-zinc-400">
        ↓ 例を見て、下のボタンで投稿
      </p>
    </div>
  );
}
