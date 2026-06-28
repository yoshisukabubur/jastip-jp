"use client";

import { createClient } from "@/lib/supabase/client";
import { useInAppBrowser } from "@/hooks/use-in-app-browser";
import { useState } from "react";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const { checked, isInApp: blockedInApp } = useInAppBrowser();

  async function signIn() {
    if (blockedInApp) {
      alert(
        "Buka di Chrome/Safari dulu.\nGoogle login tidak bisa dari browser dalam aplikasi.",
      );
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void signIn()}
      disabled={loading || !checked || blockedInApp}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
    >
      {blockedInApp
        ? "Buka di Chrome/Safari dulu"
        : loading
          ? "Redirecting…"
          : "Continue with Google"}
    </button>
  );
}
