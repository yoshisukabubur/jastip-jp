import type { ContactPanelState } from "@/lib/listing-contact";
import type { ContactLink } from "@/lib/contact-urls";
import Link from "next/link";

const CHANNEL_STYLES: Record<ContactLink["channel"], string> = {
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1ebe57] focus-visible:ring-[#25D366]",
  telegram:
    "bg-[#229ED9] text-white hover:bg-[#1d8fc4] focus-visible:ring-[#229ED9]",
  line: "bg-[#06C755] text-white hover:bg-[#05b34c] focus-visible:ring-[#06C755]",
};

function ContactButtons({
  links,
  contactNote,
}: {
  links: ContactLink[];
  contactNote: string | null;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            key={link.channel}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 ${CHANNEL_STYLES[link.channel]}`}
          >
            {link.label}
          </a>
        ))}
      </div>
      {contactNote ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{contactNote}</p>
      ) : null}
      <p className="text-xs text-zinc-500 dark:text-zinc-500">
        取引は JastipJP 外（WhatsApp 等）で行います。相手・金額・送料はご自身で確認してください。{" "}
        <Link href="/safety" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
          安全ガイド
        </Link>
      </p>
    </div>
  );
}

export function ListingContactPanel({
  listingType,
  listingId,
  state,
}: {
  listingType: "want" | "offer";
  listingId: string;
  state: ContactPanelState;
}) {
  const loginNext = `/${listingType === "want" ? "wants" : "offers"}/${listingId}`;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
        連絡 / Contact
      </h2>

      {state.status === "login" ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href={`/login?next=${loginNext}`}
            className="font-medium text-emerald-700 underline dark:text-emerald-400"
          >
            ログイン
          </Link>{" "}
          すると WhatsApp・LINE・Telegram が表示されます。
        </p>
      ) : null}

      {state.status === "seed" ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          サンプル投稿のため、連絡先はありません。
        </p>
      ) : null}

      {state.status === "own" ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          自分の投稿です。連絡先は{" "}
          <Link href="/account" className="font-medium text-emerald-700 underline dark:text-emerald-400">
            アカウント
          </Link>{" "}
          で設定してください。
        </p>
      ) : null}

      {state.status === "no-contact" ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          投稿者がまだ連絡先を登録していません。
        </p>
      ) : null}

      {state.status === "ready" ? (
        <ContactButtons links={state.links} contactNote={state.contactNote} />
      ) : null}
    </section>
  );
}
