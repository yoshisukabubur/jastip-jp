"use client";

import {
  LISTING_CATEGORIES,
  LISTING_TEMPLATE_IMAGES,
  type ListingCategory,
} from "@/lib/listing-media";
import { useMemo, useState } from "react";

export function TemplateImagePicker({
  defaultCategory = "snack",
  defaultTemplateId,
}: {
  defaultCategory?: ListingCategory;
  defaultTemplateId?: string;
}) {
  const initialTemplate =
    defaultTemplateId ??
    LISTING_TEMPLATE_IMAGES.find((t) => t.category === defaultCategory)?.id ??
    LISTING_TEMPLATE_IMAGES[0]?.id ??
    "";

  const [category, setCategory] = useState<ListingCategory>(defaultCategory);
  const [selectedId, setSelectedId] = useState(initialTemplate);

  const templates = useMemo(
    () => LISTING_TEMPLATE_IMAGES.filter((t) => t.category === category),
    [category],
  );

  const selected =
    LISTING_TEMPLATE_IMAGES.find((t) => t.id === selectedId) ?? templates[0];

  return (
    <div className="space-y-3">
      <label className="block space-y-2">
        <span className="text-sm font-medium">Kategori / カテゴリ</span>
        <select
          name="category"
          required
          value={category}
          onChange={(e) => {
            const next = e.target.value as ListingCategory;
            setCategory(next);
            const first = LISTING_TEMPLATE_IMAGES.find((t) => t.category === next);
            if (first) setSelectedId(first.id);
          }}
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-inner outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
        >
          {LISTING_CATEGORIES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <div className="space-y-2">
        <span className="text-sm font-medium">
          Gambar kategori / テンプレ画像（必須）
        </span>
        <input type="hidden" name="template_image_id" value={selected?.id ?? ""} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {templates.map((template) => {
            const active = template.id === selected?.id;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => setSelectedId(template.id)}
                className={`overflow-hidden rounded-xl border-2 text-left transition ${
                  active
                    ? "border-emerald-600 ring-2 ring-emerald-500/30"
                    : "border-zinc-200 hover:border-emerald-300 dark:border-zinc-700"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={template.url}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
                <span className="block px-2 py-1.5 text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                  {template.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
