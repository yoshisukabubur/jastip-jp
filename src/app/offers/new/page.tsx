import { CollapsibleFormSection } from "@/components/collapsible-form-section";
import { OfferScheduleFields } from "@/components/offer-schedule-fields";
import { ListingPostGuide } from "@/components/listing-post-guide";
import { TemplateImagePicker } from "@/components/template-image-picker";
import { createOffer } from "@/app/offers/actions";
import { OFFER_FORM, POSTING_TIPS_OFFER } from "@/lib/listing-form-copy";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewOfferPage({
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
          <h1 className="text-2xl font-semibold tracking-tight">{OFFER_FORM.heading}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{OFFER_FORM.subheading}</p>
        </div>
        <Link
          href="/offers"
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
          — pembeli menghubungi lewat sini.
        </p>
      ) : null}
      <ListingPostGuide tips={POSTING_TIPS_OFFER} />
      <form action={createOffer} className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium">{OFFER_FORM.title}</span>
          <input
            name="title"
            required
            minLength={8}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            placeholder={OFFER_FORM.titlePlaceholder}
          />
        </label>
        <TemplateImagePicker defaultCategory="lifestyle" />
        <label className="block space-y-2">
          <span className="text-sm font-medium">{OFFER_FORM.description}</span>
          <textarea
            name="description"
            rows={6}
            required
            minLength={20}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            placeholder={OFFER_FORM.descriptionPlaceholder}
          />
        </label>
        <CollapsibleFormSection
          title="詳細を追加（任意）/ Tambah detail"
          hint="日程・追加画像はあとからでもOK"
        >
          <OfferScheduleFields />
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
          </label>
        </CollapsibleFormSection>
        <button
          type="submit"
          className="w-full rounded-full bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          {OFFER_FORM.submit}
        </button>
      </form>
    </main>
  );
}
