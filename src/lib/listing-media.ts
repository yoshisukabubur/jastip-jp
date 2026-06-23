export const LISTING_CATEGORIES = [
  { value: "beauty", label: "Beauty / Kecantikan" },
  { value: "snack", label: "Snack / Makanan" },
  { value: "anime", label: "Anime / Karakter" },
  { value: "lifestyle", label: "Lifestyle / Gaya hidup" },
  { value: "other", label: "Other / Lainnya" },
] as const;

export type ListingCategory = (typeof LISTING_CATEGORIES)[number]["value"];

export type ListingTemplateImage = {
  id: string;
  category: ListingCategory;
  label: string;
  url: string;
};

export const LISTING_TEMPLATE_IMAGES: ListingTemplateImage[] = [
  {
    id: "beauty-essentials",
    category: "beauty",
    label: "Skincare & makeup",
    url: "https://placehold.co/1200x900/f5e7ff/4a285f?text=Beauty+Essentials",
  },
  {
    id: "beauty-skincare",
    category: "beauty",
    label: "Sunscreen & serum",
    url: "https://placehold.co/1200x900/fce7f3/7a2e52?text=Skincare",
  },
  {
    id: "snack-konbini",
    category: "snack",
    label: "Konbini limited",
    url: "https://placehold.co/1200x900/fff7d6/6b4f00?text=Konbini+Snacks",
  },
  {
    id: "snack-local",
    category: "snack",
    label: "Oleh-oleh snack",
    url: "https://placehold.co/1200x900/ffe8cc/703f00?text=Local+Snacks",
  },
  {
    id: "anime-goods",
    category: "anime",
    label: "Plush & goods",
    url: "https://placehold.co/1200x900/e0ecff/1d3f8c?text=Anime+Goods",
  },
  {
    id: "anime-gacha",
    category: "anime",
    label: "Gacha & capsule",
    url: "https://placehold.co/1200x900/dbeafe/1f497d?text=Gacha",
  },
  {
    id: "lifestyle-travel",
    category: "lifestyle",
    label: "Travel tools",
    url: "https://placehold.co/1200x900/d1fae5/14532d?text=Travel+Tools",
  },
  {
    id: "lifestyle-home",
    category: "lifestyle",
    label: "Home utility",
    url: "https://placehold.co/1200x900/ecfccb/365314?text=Home+Utility",
  },
  {
    id: "other-generic-1",
    category: "other",
    label: "General request",
    url: "https://placehold.co/1200x900/f4f4f5/3f3f46?text=General+Request",
  },
  {
    id: "other-generic-2",
    category: "other",
    label: "General offer",
    url: "https://placehold.co/1200x900/e4e4e7/27272a?text=General+Offer",
  },
];

const templateImageMap = new Map(
  LISTING_TEMPLATE_IMAGES.map((template) => [template.id, template]),
);

export function templateImageById(id: string): ListingTemplateImage | null {
  return templateImageMap.get(id) ?? null;
}

export function categoryValue(raw: string): ListingCategory {
  const normalized = raw.trim().toLowerCase();
  if (LISTING_CATEGORIES.some((category) => category.value === normalized)) {
    return normalized as ListingCategory;
  }
  return "other";
}

export function templateImageIdFromImageUrls(urls: unknown): string | null {
  if (!Array.isArray(urls)) return null;
  for (const raw of urls) {
    if (typeof raw !== "string" || raw.length === 0) continue;
    const matched = LISTING_TEMPLATE_IMAGES.find((template) => template.url === raw);
    if (matched) return matched.id;
  }
  return null;
}
