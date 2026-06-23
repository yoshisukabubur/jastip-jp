/**
 * Seed sample listings (WANT / OFFER / TREND) via Supabase service role.
 *
 * Prerequisites:
 * 1. Run migrations (including is_seed column) in Supabase SQL Editor.
 * 2. Add SUPABASE_SERVICE_ROLE_KEY to .env.local.
 *
 * Usage: npm run seed
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvLocal() {
  const path = resolve(root, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const TEMPLATE_URLS = {
  "beauty-essentials":
    "https://placehold.co/1200x900/f5e7ff/4a285f?text=Beauty+Essentials",
  "beauty-skincare":
    "https://placehold.co/1200x900/fce7f3/7a2e52?text=Skincare",
  "snack-konbini":
    "https://placehold.co/1200x900/fff7d6/6b4f00?text=Konbini+Snacks",
  "snack-local":
    "https://placehold.co/1200x900/ffe8cc/703f00?text=Local+Snacks",
  "anime-goods":
    "https://placehold.co/1200x900/e0ecff/1d3f8c?text=Anime+Goods",
  "anime-gacha":
    "https://placehold.co/1200x900/dbeafe/1f497d?text=Gacha",
  "lifestyle-travel":
    "https://placehold.co/1200x900/d1fae5/14532d?text=Travel+Tools",
  "lifestyle-home":
    "https://placehold.co/1200x900/ecfccb/365314?text=Home+Utility",
};

const SEED_USERS = [
  {
    id: "a0000000-0000-4000-8000-000000000001",
    email: "kenji.tokyo.seed@example.com",
    display_name: "Kenji · Tokyo",
    country_code: "JP",
    bio: "Weekend proxy dari area Shinjuku–Ikebukuro.",
  },
  {
    id: "a0000000-0000-4000-8000-000000000002",
    email: "ayaka.osaka.seed@example.com",
    display_name: "Ayaka · Osaka",
    country_code: "JP",
    bio: "Titip belanja konbini & Don Quijote Umeda.",
  },
  {
    id: "a0000000-0000-4000-8000-000000000003",
    email: "rina.jakarta.seed@example.com",
    display_name: "Rina · Jakarta",
    country_code: "ID",
    bio: "Cari oleh-oleh & skincare dari Jepang.",
  },
  {
    id: "a0000000-0000-4000-8000-000000000004",
    email: "dimas.bandung.seed@example.com",
    display_name: "Dimas · Bandung",
    country_code: "ID",
    bio: "Kolektor anime goods & snack limited.",
  },
];

const KENJI = SEED_USERS[0].id;
const AYAKA = SEED_USERS[1].id;
const RINA = SEED_USERS[2].id;
const DIMAS = SEED_USERS[3].id;

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(10 + (n % 5), 30, 0, 0);
  return d.toISOString();
}

const WANTS = [
  {
    user_id: RINA,
    title: "Cari KitKat matcha & sakura — 7-Eleven / Lawson",
    description:
      "Butuh 6–8 box untuk hadiah kantor. Varian musiman OK.\nBudget kira-kira ¥4,000–¥6,000 total.\nBoleh kirim foto & harga di toko sebelum bayar 🙏",
    category: "snack",
    need_by_on: "2026-06-20",
    timing_flexible: true,
    image_urls: [TEMPLATE_URLS["snack-konbini"]],
    created_at: daysAgo(2),
  },
  {
    user_id: DIMAS,
    title: "Sunscreen Biore UV Aqua Rich SPF50+ — 3 tube",
    description:
      "Stok di marketplace habis. Merek: Biore (biru) atau Anessa kalau ada.\nBudget ~¥3,500/tube termasuk fee jastip.\nKirim foto tanggal beli ya.",
    category: "beauty",
    need_by_on: "2026-07-01",
    timing_flexible: false,
    image_urls: [TEMPLATE_URLS["beauty-skincare"]],
    created_at: daysAgo(4),
  },
  {
    user_id: RINA,
    title: "Plush Pokémon Center — edisi musim ini",
    description:
      "Cari 1 plush restock bulan ini (Pikachu / Eevee line OK).\nBudget max ¥8,500.\nPrefer beli langsung di toko, bukan reseller.",
    category: "anime",
    need_by_on: "2026-06-30",
    timing_flexible: true,
    image_urls: [TEMPLATE_URLS["anime-goods"]],
    created_at: daysAgo(6),
  },
  {
    user_id: DIMAS,
    title: "Tokyo Banana + Royce nama chocolate — set oleh-oleh",
    description:
      "Mau 2 box Tokyo Banana original + 1 box Royce nama.\nUntuk hadiah keluarga. Total budget ~¥5,000.\nBoleh gabung dengan buyer lain kalau ongkir lebih hemat.",
    category: "snack",
    timing_flexible: true,
    image_urls: [TEMPLATE_URLS["snack-local"]],
    created_at: daysAgo(8),
  },
  {
    user_id: RINA,
    title: "Hada Labo Gokujyun lotion + foaming cleanser",
    description:
      "Set lengkap (lotion 160ml + cleanser). Boleh merek lain setara kalau Hada Labo kosong.\nBudget ¥4,000–¥5,500.\nButuh sebelum akhir Juni.",
    category: "beauty",
    need_by_on: "2026-06-25",
    timing_flexible: false,
    image_urls: [TEMPLATE_URLS["beauty-essentials"]],
    created_at: daysAgo(10),
  },
  {
    user_id: DIMAS,
    title: "Set pouch travel Muji — ukuran medium",
    description:
      "Warna netral (abu / navy). 2 set.\nBudget ~¥2,800/set.\nTidak urgent — fleksibel 2–3 minggu.",
    category: "lifestyle",
    need_by_on: null,
    timing_flexible: true,
    image_urls: [TEMPLATE_URLS["lifestyle-travel"]],
    created_at: daysAgo(12),
  },
];

const OFFERS = [
  {
    user_id: KENJI,
    title: "Titip Pokémon Center & Animate — area Shinjuku",
    description:
      "Weekend shop (Sabtu/Minggu). Plush, keychain, goods limited OK.\nFee: ¥500/item + harga barang. Ongkir ke ID dibahas di chat.\nKirim foto & struk sebelum checkout.",
    category: "anime",
    shop_in_japan_on: "2026-06-07",
    heading_to_indonesia_on: "2026-06-18",
    order_cutoff_on: "2026-06-05",
    schedule_note: "Bisa delay 2–3 hari kalau antre panjang",
    image_urls: [TEMPLATE_URLS["anime-gacha"]],
    created_at: daysAgo(1),
  },
  {
    user_id: AYAKA,
    title: "Konbini snack musiman — Lawson & FamilyMart Osaka",
    description:
      "Beli snack limited + oleh-oleh box. Min order 3 item.\nFee ¥400/item. Gabung order = ongkir lebih ringan.\nArea pickup: Umeda / Namba.",
    category: "snack",
    shop_in_japan_on: "2026-06-09",
    heading_to_indonesia_on: "2026-06-22",
    order_cutoff_on: "2026-06-07",
    image_urls: [TEMPLATE_URLS["snack-konbini"]],
    created_at: daysAgo(3),
  },
  {
    user_id: KENJI,
    title: "Drugstore Matsumoto Kiyoshi — sunscreen & skincare",
    description:
      "Belanja rutin tiap Rabu sore (Shinjuku store).\nFee 10% dari total belanja, min ¥500.\nTidak terima obat resep / item terlarang.",
    category: "beauty",
    shop_in_japan_on: "2026-06-11",
    order_cutoff_on: "2026-06-10",
    image_urls: [TEMPLATE_URLS["beauty-skincare"]],
    created_at: daysAgo(5),
  },
  {
    user_id: AYAKA,
    title: "Don Quijote Umeda — travel goods & oleh-oleh",
    description:
      "Titip barang kecil (pouch, snack, minuman). Max 5 kg per batch.\nFee ¥500/item. Foto rak toko dikirim dulu kalau item langka.\nChat lewat WhatsApp (atur di halaman Akun).",
    category: "lifestyle",
    shop_in_japan_on: "2026-06-14",
    heading_to_indonesia_on: "2026-06-28",
    order_cutoff_on: "2026-06-12",
    image_urls: [TEMPLATE_URLS["lifestyle-home"]],
    created_at: daysAgo(7),
  },
];

const TRENDS = [
  {
    title: "KitKat sakura × matcha — mulai muncul di konbini",
    body: "Varian musiman biasanya habis cepat. Banyak WANT snack untuk hadiah kantor & oleh-oleh.",
    category: "snack",
    image_urls: [TEMPLATE_URLS["snack-konbini"]],
    created_at: daysAgo(1),
  },
  {
    title: "Sunscreen Jepang 2026 — model baru di drugstore",
    body: "Biore & Anessa stok bertahap. Permintaan 3–5 tube sekaligus sering muncul dari pembeli Indonesia.",
    category: "beauty",
    image_urls: [TEMPLATE_URLS["beauty-skincare"]],
    created_at: daysAgo(3),
  },
  {
    title: "Pokémon Center — restock plush musim panas",
    body: "Antre pagi di Tokyo & Osaka. Proxy yang bisa foto toko real-time lebih dipercaya.",
    category: "anime",
    image_urls: [TEMPLATE_URLS["anime-goods"]],
    created_at: daysAgo(5),
  },
  {
    title: "Tokyo Banana & Royce — set oleh-oleh populer",
    body: "Cocok untuk batch order. Gabung beberapa WANT bisa hemat ongkir.",
    category: "snack",
    image_urls: [TEMPLATE_URLS["snack-local"]],
    created_at: daysAgo(7),
  },
  {
    title: "Muji travel pouch — stok warna netral cepat habis",
    body: "Ukuran medium paling dicari. OFFER lifestyle area stasiun besar lebih mudah ditanggapi.",
    category: "lifestyle",
    image_urls: [TEMPLATE_URLS["lifestyle-travel"]],
    created_at: daysAgo(9),
  },
];

async function ensureSeedUser(user) {
  const { data: existing } = await supabase.auth.admin.getUserById(user.id);
  if (existing?.user) {
    await supabase
      .from("users")
      .update({
        display_name: user.display_name,
        country_code: user.country_code,
        bio: user.bio,
      })
      .eq("id", user.id);
    return;
  }

  const { error } = await supabase.auth.admin.createUser({
    id: user.id,
    email: user.email,
    email_confirm: true,
    user_metadata: {
      full_name: user.display_name,
      name: user.display_name,
    },
  });

  if (error) {
    throw new Error(`createUser ${user.email}: ${error.message}`);
  }

  await supabase
    .from("users")
    .update({
      display_name: user.display_name,
      country_code: user.country_code,
      bio: user.bio,
    })
    .eq("id", user.id);
}

async function clearSeed() {
  await supabase.from("wants").delete().eq("is_seed", true);
  await supabase.from("offers").delete().eq("is_seed", true);
  await supabase.from("trends").delete().eq("is_seed", true);
}

async function main() {
  console.log("Ensuring seed users…");
  for (const user of SEED_USERS) await ensureSeedUser(user);

  console.log("Removing previous seed rows…");
  await clearSeed();

  console.log("Inserting wants…");
  const { error: wantsErr } = await supabase.from("wants").insert(
    WANTS.map((row) => ({
      ...row,
      status: "active",
      is_seed: true,
    })),
  );
  if (wantsErr) throw new Error(`wants: ${wantsErr.message}`);

  console.log("Inserting offers…");
  const { error: offersErr } = await supabase.from("offers").insert(
    OFFERS.map((row) => ({
      ...row,
      status: "active",
      is_seed: true,
    })),
  );
  if (offersErr) throw new Error(`offers: ${offersErr.message}`);

  console.log("Inserting trends…");
  const { error: trendsErr } = await supabase.from("trends").insert(
    TRENDS.map((row) => ({
      ...row,
      user_id: KENJI,
      status: "published",
      is_seed: true,
    })),
  );
  if (trendsErr) throw new Error(`trends: ${trendsErr.message}`);

  console.log(
    `Done. ${WANTS.length} wants, ${OFFERS.length} offers, ${TRENDS.length} trends.`,
  );
  console.log("Refresh /wants, /offers, and /trends.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
