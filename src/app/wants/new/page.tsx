import { CollapsibleFormSection } from "@/components/collapsible-form-section";
import { WantScheduleFields } from "@/components/want-schedule-fields";
import { ListingPostGuide } from "@/components/listing-post-guide";
import { TemplateImagePicker } from "@/components/template-image-picker";
import { createWant } from "@/app/wants/actions";
import { POSTING_TIPS_WANT, WANT_FORM } from "@/lib/listing-form-copy";
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
  const { data: contacts } = await supabase
    .from("user_contacts")
    .select("whatsapp_url, line_url, telegram_url")
    .eq("user_id", user.id)
    .maybeSingle();
  const hasContact = Boolean(
    contacts &&
      (contacts.whatsapp_url || contacts.line_url || contacts.telegram_url),
  );

  return (
    <main className="mx-auto max-w-xl space-y-8 px-4 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{WANT_FORM.heading}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{WANT_FORM.subheading}</p>
        </div>
        <Link
          href="/wants"
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          Batal / キャンセル
        </Link>
      </div>
      {err ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {decodeURIComponent(err)}
        </p>
      ) : null}
      {!hasContact ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
          WhatsApp/LINE belum diatur. Isi dulu di{" "}
          <Link href="/account" className="underline">
            Akun / アカウント
          </Link>{" "}
          supaya penitip bisa menghubungi kamu.
        </p>
      ) : null}
      <ListingPostGuide tips={POSTING_TIPS_WANT} />
      <form action={createWant} className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium">{WANT_FORM.title}</span>
          <input
            name="title"
            required
            minLength={8}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            placeholder={WANT_FORM.titlePlaceholder}
          />
        </label>
        <TemplateImagePicker defaultCategory="snack" />
        <label className="block space-y-2">
          <span className="text-sm font-medium">{WANT_FORM.description}</span>
          <textarea
            name="description"
            rows={6}
            required
            minLength={20}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            placeholder={WANT_FORM.descriptionPlaceholder}
          />
        </label>
        <CollapsibleFormSection
          title="詳細を追加（任意）/ Tambah detail"
          hint="日程・配送先・追加画像はあとからでもOK"
        >
          <WantScheduleFields />
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              配送先 / Tujuan pengiriman
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              詳細住所は書かず、まずは都市とエリアだけ入力してください。
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-medium">都市 / Kota</span>
                <input
                  name="delivery_city"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
                  placeholder="Jakarta"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">州・県 / Provinsi</span>
                <input
                  name="delivery_region"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
                  placeholder="DKI Jakarta"
                />
              </label>
            </div>
            <label className="block space-y-2">
              <span className="text-sm font-medium">備考 / Catatan</span>
              <textarea
                name="delivery_note"
                rows={3}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
                placeholder="Contoh: bisa kirim ke rumah / kantor."
              />
            </label>
          </section>
          <label className="block space-y-2">
            <span className="text-sm font-medium">
              URL foto tambahan / 追加画像
            </span>
            <input
              name="custom_image_url"
              type="url"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
              placeholder="https://..."
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Link foto produk asli (Shopee, IG, dll.) membuat posting lebih dipercaya.
            </p>
          </label>
        </CollapsibleFormSection>
        <button
          type="submit"
          className="w-full rounded-full bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          {WANT_FORM.submit}
        </button>
      </form>
    </main>
  );
}
