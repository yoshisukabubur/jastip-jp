import type { ReactNode } from "react";

export function CollapsibleFormSection({
  title,
  hint,
  defaultOpen = false,
  children,
}: {
  title: string;
  hint?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/20"
    >
      <summary className="cursor-pointer list-none px-4 py-3 [&::-webkit-details-marker]:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </p>
            {hint ? (
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
            ) : null}
          </div>
          <span
            className="shrink-0 text-xs font-medium text-emerald-700 transition group-open:rotate-180 dark:text-emerald-400"
            aria-hidden
          >
            ▼
          </span>
        </div>
      </summary>
      <div className="space-y-4 border-t border-zinc-200 px-4 py-4 dark:border-zinc-800">
        {children}
      </div>
    </details>
  );
}
