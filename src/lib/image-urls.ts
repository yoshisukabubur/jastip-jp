export function formatImageUrlsForInput(urls: unknown): string {
  if (!Array.isArray(urls)) return "";
  return urls
    .filter((u): u is string => typeof u === "string" && u.length > 0)
    .join("\n");
}

export function parseImageUrls(raw: string): string[] {
  return raw
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function firstImageUrl(urls: unknown): string | null {
  if (!Array.isArray(urls) || urls.length === 0) return null;
  const first = urls[0];
  return typeof first === "string" && first.length > 0 ? first : null;
}

export function formatRelativeTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 48) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 14) return `${days}d ago`;
  return d.toLocaleDateString();
}
