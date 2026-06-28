import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { InAppBrowserNotice } from "@/components/in-app-browser-notice";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <main className="mx-auto flex max-w-md flex-col gap-8 px-4 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in to JastipJP</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Use Google via Supabase Auth. After signing in you can post wants, offers,
          and update your contact links.
        </p>
      </div>
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          Something went wrong with authentication. Please try again.
        </p>
      ) : null}
      <InAppBrowserNotice />
      <GoogleSignInButton />
      <p className="text-center text-xs text-zinc-500">
        By continuing you agree to your identity provider&apos;s terms.{" "}
        <Link href="/" className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
          Back home
        </Link>
      </p>
    </main>
  );
}
