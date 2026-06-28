"use client";

import { useInAppBrowser } from "@/hooks/use-in-app-browser";
import { useState } from "react";

export function InAppBrowserNotice() {
  const { checked, appName } = useInAppBrowser();
  const [copied, setCopied] = useState(false);

  if (!checked || !appName) return null;

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy link ini / このURLをコピー:", window.location.href);
    }
  }

  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
      <p className="font-semibold">
        Buka di Chrome / Safari dulu / 外部ブラウザで開いてください
      </p>
      <p className="mt-2 text-amber-900/90 dark:text-amber-100/90">
        Kamu membuka dari <strong>{appName}</strong>. Login Google tidak bisa
        dari browser dalam aplikasi.
      </p>
      <ol className="mt-3 list-inside list-decimal space-y-1 text-amber-900/90 dark:text-amber-100/90">
        <li>
          Ketuk <strong>⋯</strong> atau <strong>⋮</strong> di pojok kanan atas
        </li>
        <li>
          Pilih <strong>Buka di Chrome</strong> / <strong>Buka di Safari</strong>
        </li>
        <li>Login ulang di browser luar</li>
      </ol>
      <p className="mt-3 text-xs text-amber-800/80 dark:text-amber-200/80">
        {appName} 内では Google ログインがブロックされます（Google の制限です）。
      </p>
      <button
        type="button"
        onClick={() => void copyUrl()}
        className="mt-3 w-full rounded-full border border-amber-400 bg-white px-4 py-2 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 dark:border-amber-800 dark:bg-zinc-950 dark:text-amber-100 dark:hover:bg-amber-950/60"
      >
        {copied ? "Link disalin ✓ / コピーしました" : "Salin link / URLをコピー"}
      </button>
    </div>
  );
}
