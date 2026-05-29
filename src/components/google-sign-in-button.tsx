"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  async function signIn() {
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
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
    >
        {loading ? "Redirecting…" : "Continue with Google"}
    </button>
  );
}
