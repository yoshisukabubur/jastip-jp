export type ContactChannel = "whatsapp" | "telegram" | "line";

export type ContactLink = {
  channel: ContactChannel;
  url: string;
  label: string;
};

const ALLOWED_HOSTS: Record<ContactChannel, RegExp[]> = {
  whatsapp: [/^(www\.)?wa\.me$/i, /^(www\.)?api\.whatsapp\.com$/i, /^(www\.)?chat\.whatsapp\.com$/i],
  telegram: [/^(www\.)?t\.me$/i, /^(www\.)?telegram\.me$/i],
  line: [/^(www\.)?line\.me$/i, /^(www\.)?lin\.ee$/i],
};

function tryParseUrl(raw: string): URL | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

function hostMatches(channel: ContactChannel, host: string): boolean {
  const h = host.toLowerCase();
  return ALLOWED_HOSTS[channel].some((re) => re.test(h));
}

/** Returns normalized https URL or null if invalid / disallowed host. */
export function sanitizeContactUrl(
  raw: string,
  channel: ContactChannel,
): string | null {
  const url = tryParseUrl(raw);
  if (!url) return null;
  if (!hostMatches(channel, url.hostname)) return null;
  return url.toString();
}

export function buildContactLinks(profile: {
  whatsapp_url: string | null;
  line_url: string | null;
  telegram_url: string | null;
}): ContactLink[] {
  const links: ContactLink[] = [];
  const wa = profile.whatsapp_url
    ? sanitizeContactUrl(profile.whatsapp_url, "whatsapp")
    : null;
  if (wa) {
    links.push({ channel: "whatsapp", url: wa, label: "WhatsApp" });
  }
  const tg = profile.telegram_url
    ? sanitizeContactUrl(profile.telegram_url, "telegram")
    : null;
  if (tg) {
    links.push({ channel: "telegram", url: tg, label: "Telegram" });
  }
  const line = profile.line_url ? sanitizeContactUrl(profile.line_url, "line") : null;
  if (line) {
    links.push({ channel: "line", url: line, label: "LINE" });
  }
  return links;
}
