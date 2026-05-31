"use client";

import { useTransition } from "react";

export function ListingDeleteForm({
  action,
  listingId,
  listingLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  listingId: string;
  listingLabel: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        const message = `「${listingLabel}」を削除しますか？この操作は取り消せません。`;
        if (!window.confirm(message)) return;
        startTransition(() => action(formData));
      }}
      className="inline"
    >
      <input type="hidden" name="id" value={listingId} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950"
      >
        {pending ? "削除中…" : "削除"}
      </button>
    </form>
  );
}
