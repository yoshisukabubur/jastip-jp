import { updateWant } from "@/app/wants/actions";
import { WantScheduleFields } from "@/components/want-schedule-fields";
import {
  LISTING_CATEGORIES,
  LISTING_TEMPLATE_IMAGES,
  templateImageIdFromImageUrls,
} from "@/lib/listing-media";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type WantRow = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string | null;
  status: string;
  image_urls: unknown;
  need_by_on: string | null;
  timing_flexible: boolean;
  delivery_city: string | null;
  delivery_region: string | null;
  delivery_note: string | null;
};

export default async function EditWantPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/wants/${id}/edit`);

  const { data } = await supabase
    .from("wants")
    .select(
      "id, user_id, title, description, category, status, image_urls, need_by_on, timing_flexible, delivery_city, delivery_region, delivery_note",
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const want = data as WantRow;
  if (want.user_id !== user.id) redirect(`/wants/${id}`);

  const templateImageId =
    templateImageIdFromImageUrls(want.image_urls) ?? LISTING_TEMPLATE_IMAGES[0]?.id;
  const imageUrls = Array.isArray(want.image_urls)
    ? want.image_urls.filter((url): url is string => typeof url === "string")
    : [];
  const customImageUrl =
    imageUrls[0] &&
    !LISTING_TEMPLATE_IMAGES.some((template) => template.url === imageUrls[0])
      ? imageUrls[0]
      : "";

  return (
    <main className="mx-auto max-w-xl space-y-8 px-4 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Want を編集</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            内容を更新して保存します。
          </p>
        </div>
        <Link
          href={`/wants/${id}`}
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          キャンセル
        </Link>
      </div>
      {query.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {decodeURIComponent(query.error)}
        </p>
      ) : null}
      <form action={updateWant} className="space-y-5">
        <input type="hidden" name="id" value={want.id} />
        <label className="block space-y-2">
          <span className="text-sm font-medium">Title</span>
          <input
            name="title"
            required
            defaultValue={want.title}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Category</span>
          <select
            name="category"
            required
            defaultValue={want.category ?? "beauty"}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          >
            {LISTING_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Description</span>
          <textarea
            name="description"
            rows={4}
            defaultValue={want.description ?? ""}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          />
        </label>
        <WantScheduleFields
          needByOn={want.need_by_on ?? ""}
          timingFlexible={want.timing_flexible}
        />
        <section className="space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            配送先 / Tujuan pengiriman
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium">都市 / Kota</span>
              <input
                name="delivery_city"
                defaultValue={want.delivery_city ?? ""}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium">州・県 / Provinsi</span>
              <input
                name="delivery_region"
                defaultValue={want.delivery_region ?? ""}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </label>
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-medium">備考（任意） / Catatan</span>
            <textarea
              name="delivery_note"
              rows={3}
              defaultValue={want.delivery_note ?? ""}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            />
          </label>
        </section>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Template image (required)</span>
          <select
            name="template_image_id"
            required
            defaultValue={templateImageId}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          >
            {LISTING_CATEGORIES.map((category) => (
              <optgroup key={category.value} label={category.label}>
                {LISTING_TEMPLATE_IMAGES.filter(
                  (template) => template.category === category.value,
                ).map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Additional image URL (optional)</span>
          <input
            name="custom_image_url"
            type="url"
            defaultValue={customImageUrl}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            placeholder="https://..."
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Status</span>
          <select
            name="status"
            defaultValue={want.status}
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
          保存する
        </button>
      </form>
    </main>
  );
}
