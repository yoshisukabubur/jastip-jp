import { updateProfile } from "@/app/account/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

type Profile = {
  display_name: string | null;
  country_code: string | null;
  bio: string | null;
  whatsapp_url: string | null;
  line_url: string | null;
  telegram_url: string | null;
  contact_note: string | null;
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profileRow } = await supabase
    .from("users")
    .select(
      "display_name, country_code, bio, whatsapp_url, line_url, telegram_url, contact_note",
    )
    .eq("id", user.id)
    .maybeSingle();

  const profile = (profileRow ?? {}) as Profile;
  const params = await searchParams;

  return (
    <main className="mx-auto max-w-xl space-y-8 px-4 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Update how buyers can reach you across channels.
          </p>
        </div>
        <Link
          href="/"
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          Home
        </Link>
      </div>
      {params.saved ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          Profile saved.
        </p>
      ) : null}
      {params.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {decodeURIComponent(params.error)}
        </p>
      ) : null}
      <form action={updateProfile} className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium">Display name</span>
          <input
            name="display_name"
            defaultValue={profile.display_name ?? ""}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Country code</span>
          <input
            name="country_code"
            defaultValue={profile.country_code ?? ""}
            placeholder="JP, ID, US…"
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Bio</span>
          <textarea
            name="bio"
            rows={3}
            defaultValue={profile.bio ?? ""}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          />
        </label>
        <div className="space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Contact links
          </p>
          <label className="block space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              WhatsApp URL
            </span>
            <input
              name="whatsapp_url"
              defaultValue={profile.whatsapp_url ?? ""}
              placeholder="https://wa.me/..."
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              LINE URL
            </span>
            <input
              name="line_url"
              defaultValue={profile.line_url ?? ""}
              placeholder="https://line.me/..."
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Telegram URL
            </span>
            <input
              name="telegram_url"
              defaultValue={profile.telegram_url ?? ""}
              placeholder="https://t.me/..."
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Contact note
            </span>
            <textarea
              name="contact_note"
              rows={2}
              defaultValue={profile.contact_note ?? ""}
              placeholder="Hours, language preferences, group rules…"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          Save profile
        </button>
      </form>
    </main>
  );
}
