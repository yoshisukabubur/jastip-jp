import { ListingSchedule } from "@/components/listing-schedule";
import Link from "next/link";

export function ListingCard({
  href,
  title,
  category,
  status,
  excerpt,
  imageUrl,
  meta,
  scheduleLines,
  scheduleExpired,
  isSample,
}: {
  href?: string;
  title: string;
  category: string | null;
  status: string;
  excerpt: string | null;
  imageUrl: string | null;
  meta: string;
  scheduleLines?: string[];
  scheduleExpired?: boolean;
  isSample?: boolean;
}) {
  const inner = (
    <>
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
            No image
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {category ? (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
              {category}
            </span>
          ) : null}
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            {status}
          </span>
          {isSample ? (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
              Contoh / サンプル
            </span>
          ) : null}
        </div>
        <h2 className="mt-1 text-base font-semibold text-zinc-900 group-hover:text-emerald-700 dark:text-zinc-50 dark:group-hover:text-emerald-300">
          {title}
        </h2>
        {excerpt ? (
          <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {excerpt}
          </p>
        ) : null}
        {scheduleLines && scheduleLines.length > 0 ? (
          <ListingSchedule lines={scheduleLines} expired={scheduleExpired} />
        ) : null}
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">{meta}</p>
      </div>
    </>
  );

  const className =
    "group flex gap-4 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-900";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
