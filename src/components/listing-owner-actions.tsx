import { ListingDeleteForm } from "@/components/listing-delete-form";
import Link from "next/link";

export function ListingOwnerActions({
  listingType,
  listingId,
  listingTitle,
  deleteAction,
}: {
  listingType: "want" | "offer";
  listingId: string;
  listingTitle: string;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const base = listingType === "want" ? "/wants" : "/offers";

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/30">
      <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
        あなたの投稿
      </span>
      <Link
        href={`${base}/${listingId}/edit`}
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-100 dark:bg-zinc-950 dark:text-emerald-200 dark:hover:bg-emerald-900"
      >
        編集
      </Link>
      <ListingDeleteForm
        action={deleteAction}
        listingId={listingId}
        listingLabel={listingTitle}
      />
    </div>
  );
}
