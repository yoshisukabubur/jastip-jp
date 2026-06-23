import Link from "next/link";

const nav = [
  { href: "/wants", label: "Wants", sublabel: "欲しい", icon: "🎯" },
  { href: "/offers", label: "Offers", sublabel: "買えます", icon: "🛍️" },
  { href: "/trends", label: "Trends", sublabel: "話題", icon: "📈" },
];

export function SiteHeader({
  email,
  signedIn,
}: {
  email: string | null;
  signedIn: boolean;
}) {
  return (
    <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Jastip<span className="text-emerald-600 dark:text-emerald-400">JP</span>
          </Link>
          <nav className="hidden items-center gap-4 sm:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden>{item.icon}</span>
                  <span>
                    {item.label}
                    <span className="ml-1 hidden text-zinc-400 lg:inline dark:text-zinc-500">
                      / {item.sublabel}
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {signedIn ? (
            <>
              <Link
                href="/my-listings"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                自分の投稿
              </Link>
              <Link
                href="/safety"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                安全
              </Link>
              <Link
                href="/account"
                className="max-w-[10rem] truncate text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                title={email ?? undefined}
              >
                アカウント
              </Link>
              <form action="/auth/sign-out" method="post">
                <button
                  type="submit"
                  className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  ログアウト
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
            >
              ログイン
            </Link>
          )}
        </div>
      </div>
      <div className="flex border-t border-zinc-100 px-4 py-2 sm:hidden dark:border-zinc-900">
        <nav className="flex flex-wrap gap-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              <span className="inline-flex items-center gap-1">
                <span aria-hidden>{item.icon}</span>
                <span>{item.sublabel}</span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
