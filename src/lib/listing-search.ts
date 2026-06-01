/** Sanitize user input for PostgREST ilike patterns. */
export function sanitizeSearchTerm(raw: string): string {
  return raw
    .trim()
    .replace(/[%_,]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 80);
}

export function parseListingSearchParams(params: {
  q?: string;
  category?: string;
  status?: string;
}) {
  const q = sanitizeSearchTerm(params.q ?? "");
  const category = sanitizeSearchTerm(params.category ?? "");
  const status = (params.status ?? "").trim().slice(0, 32);
  return {
    q,
    category,
    status,
    hasFilters: Boolean(q || category || status),
  };
}

export type ListingSearchFilters = ReturnType<typeof parseListingSearchParams>;
