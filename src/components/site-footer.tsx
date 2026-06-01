import Link from "next/link";

const links = [
  { href: "/safety", label: "安全ガイド" },
  { href: "/terms", label: "利用規約" },
  { href: "/guide", label: "東京案内（予約制）" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          JastipJP — 日本↔インドネシアの代行掲示板（ベータ）
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
