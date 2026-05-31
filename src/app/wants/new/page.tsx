import { WantScheduleFields } from "@/components/want-schedule-fields";
import { createWant } from "@/app/wants/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewWantPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const params = await searchParams;
  const err = params.error;

  return (
    <main className="mx-auto max-w-xl space-y-8 px-4 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">New want</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Describe what you are looking for from Japan.
          </p>
        </div>
        <Link
          href="/wants"
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          Cancel
        </Link>
      </div>
      {err ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {decodeURIComponent(err)}
        </p>
      ) : null}
      <form action={createWant} className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium">Title</span>
          <input
            name="title"
            required
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            placeholder="e.g. Limited Pokémon Center plush restock"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Category</span>
          <input
            name="category"
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            placeholder="Anime, streetwear, snacks…"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Description</span>
          <textarea
            name="description"
            rows={4}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            placeholder="Budget, sizing, links, timing…"
          />
        </label>
        <WantScheduleFields />
        <label className="block space-y-2">
          <span className="text-sm font-medium">Image URLs</span>
          <textarea
            name="image_urls"
            rows={3}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            placeholder={"One URL per line or comma-separated"}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Status</span>
          <select
            name="status"
            defaultValue="active"
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <option value="active">active</option>
            <option value="fulfilled">fulfilled</option>
            <option value="closed">closed</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          Publish want
        </button>
      </form>
    </main>
  );
}
