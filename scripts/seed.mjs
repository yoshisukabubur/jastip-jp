/**
 * Seed demo listings (WANT / OFFER / TREND) via Supabase service role.
 *
 * Prerequisites:
 * 1. Run migrations (including 20250527000000_add_is_seed.sql) in Supabase SQL Editor.
 * 2. Add SUPABASE_SERVICE_ROLE_KEY to .env.local (Dashboard → Settings → API → secret key).
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

const BOTS = [
  {
    id: "a0000000-0000-4000-8000-000000000001",
    email: "jastipbot.tokyo@example.com",
    display_name: "JastipBot Tokyo",
    country_code: "JP",
    bio: "Contoh penawaran dari proxy Jepang (data demo).",
  },
  {
    id: "a0000000-0000-4000-8000-000000000002",
    email: "jastipbot.jakarta@example.com",
    display_name: "JastipBot Jakarta",
    country_code: "ID",
    bio: "Contoh permintaan dari pembeli Indonesia (data demo).",
  },
];

const TOKYO_ID = BOTS[0].id;
const JAKARTA_ID = BOTS[1].id;

const WANTS = [
  {
    title: "Plush Pokémon Center — edisi terbatas",
    description:
      "Cari plush restock bulan ini. Budget ~¥8,000. Bisa kirim foto asli sebelum bayar.",
    category: "Anime",
    need_by_on: "2026-07-15",
    timing_flexible: false,
    image_urls: [
      "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=400&q=80",
    ],
  },
  {
    title: "Snack KitKat matcha & sakura",
    description: "Beli 5–10 box untuk hadiah. Varian musiman OK.",
    category: "Snacks",
    image_urls: [
      "https://images.unsplash.com/photo-1606312619070-d48b4b6b3b3b?w=400&q=80",
    ],
  },
  {
    title: "Kosmetik drugstore — sunscreen Jepang",
    description: "Biore / Anessa / Skin Aqua. Harga + ongkir diutamakan.",
    category: "Cosmetics",
    image_urls: [
      "https://images.unsplash.com/photo-1556228578-0d63b0c0c0c0?w=400&q=80",
    ],
  },
  {
    title: "Sneaker NB 550 / Asics gel — size 27cm",
    description: "Warna netral. Boleh bekas like-new dari outlet.",
    category: "Sneakers",
    image_urls: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    ],
  },
  {
    title: "Figure One Piece — preorder aman",
    description: "Butuh proxy yang bisa hold sampai rilis resmi.",
    category: "Anime",
    image_urls: [
      "https://images.unsplash.com/photo-1612036782180-6f0b6b6b6b6b?w=400&q=80",
    ],
  },
  {
    title: "Kamera instan Fujifilm — stok Tokyo",
    description: "Mini Evo atau Wide. 1–2 unit.",
    category: "Electronics",
    image_urls: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80",
    ],
  },
  {
    title: "Uniqlo x kolaborasi terbaru",
    description: "Size M–L. Link produk bisa dikirim lewat chat.",
    category: "Fashion",
    image_urls: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
    ],
  },
  {
    title: "Stationery Loft — washi & pen",
    description: "Gift set untuk event kantor. Budget fleksibel.",
    category: "Stationery",
    image_urls: [
      "https://images.unsplash.com/photo-1452860606248-08befc0ff87b?w=400&q=80",
    ],
  },
  {
    title: "Nintendo Switch game — pre-order",
    description: "Judul Jepang OK. Physical copy.",
    category: "Games",
    image_urls: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80",
    ],
  },
  {
    title: "Skincare Hadalabo — set lengkap",
    description: "Gantiin stok toko online yang habis.",
    category: "Cosmetics",
    image_urls: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80",
    ],
  },
  {
    title: "Vintage Levi's — waist 32",
    description: "Prefer toko second di Shimokitazawa / Koenji.",
    category: "Fashion",
    image_urls: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
    ],
  },
  {
    title: "Matcha powder ceremonial grade",
    description: "Uji / Nishio. Butuh invoice untuk customs.",
    category: "Snacks",
    image_urls: [
      "https://images.unsplash.com/photo-1515823064-d6b0a3d404a2?w=400&q=80",
    ],
  },
];

const OFFERS = [
  {
    title: "代行OK：アニメイト・ポケセン巡回（週1）",
    description:
      "都内在住。限定ぬいぐるみ・グッズの店舗購入代行。送料・手数料はDMで見積もり。",
    category: "Anime",
    shop_in_japan_on: "2026-06-10",
    heading_to_indonesia_on: "2026-06-18",
    order_cutoff_on: "2026-06-08",
    schedule_note: "便遅延の可能性あり / Bisa terlambat",
    image_urls: [
      "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=400&q=80",
    ],
  },
  {
    title: "ドラッグストアまとめ買い代行",
    description: "マツキヨ・サンドラッグ。日焼け止め・医薬品は要確認。",
    category: "Cosmetics",
    image_urls: [
      "https://images.unsplash.com/photo-1556228578-0d63b0c0c0c0?w=400&q=80",
    ],
  },
  {
    title: "お菓子・季節限定お土産セット",
    description: "東京駅・羽田限定も対応可。箱詰めして海外発送。",
    category: "Snacks",
    image_urls: [
      "https://images.unsplash.com/photo-1606312619070-d48b4b6b3b3b?w=400&q=80",
    ],
  },
  {
    title: "スニーカー・ストリート系ショップ代行",
    description: "atmos / ABC-MART 等。サイズ確認後に購入。",
    category: "Sneakers",
    image_urls: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    ],
  },
  {
    title: "中古カメラ・レンズ（秋葉原・新宿）",
    description: "動作確認して写真付きで報告。高額品は保険相談可。",
    category: "Electronics",
    image_urls: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80",
    ],
  },
  {
    title: "ユニクロ・GU コラボ品ピックアップ",
    description: "人気サイズは早めに。在庫なしの場合はキャンセル料なし。",
    category: "Fashion",
    image_urls: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
    ],
  },
  {
    title: "ゲームソフト・限定版予約代行",
    description: "Amazon / 店舗予約どちらも可。発売日に合わせて発送。",
    category: "Games",
    image_urls: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80",
    ],
  },
  {
    title: "文房具・Loft / Tokyu Hands",
    description: "まとめ買い割引を還元。小物は平置き梱包。",
    category: "Stationery",
    image_urls: [
      "https://images.unsplash.com/photo-1452860606248-08befc0ff87b?w=400&q=80",
    ],
  },
  {
    title: "古着・ヴィンテージ（下北沢エリア）",
    description: "指定ブランド・サイズで探し買い。写真複数枚送付。",
    category: "Fashion",
    image_urls: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
    ],
  },
  {
    title: "抹茶・和菓子ギフトボックス",
    description: "法人ギフト向け。のし・メッセージカード対応。",
    category: "Snacks",
    image_urls: [
      "https://images.unsplash.com/photo-1515823064-d6b0a3d404a2?w=400&q=80",
    ],
  },
];

const TRENDS = [
  {
    title: "ポケモンセンター：春のぬいぐるみ再入荷ラッシュ",
    body: "東京・大阪店で午前中に行列。WANTが急増中。代理購入の需要あり。",
    category: "Anime",
    image_urls: [
      "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=400&q=80",
    ],
  },
  {
    title: "日焼け止め：2026年モデルがドラッグストアで並び始め",
    body: "SPF50+の大容量が人気。インドネシア向けまとめ買いの相談増。",
    category: "Cosmetics",
    image_urls: [
      "https://images.unsplash.com/photo-1556228578-0d63b0c0c0c0?w=400&q=80",
    ],
  },
  {
    title: "KitKat 季節限定：桜×抹茶がコンビニ先行",
    body: "空港価格より店舗が安いケースあり。スナック系OFFERと相性良し。",
    category: "Snacks",
    image_urls: [
      "https://images.unsplash.com/photo-1606312619070-d48b4b6b3b3b?w=400&q=80",
    ],
  },
  {
    title: "New Balance 550：復刻カラーが再販",
    body: "サイズ27–28cmが売り切れ早い。スニーカー代行の問い合わせ注意。",
    category: "Sneakers",
    image_urls: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    ],
  },
  {
    title: "ユニクロ×アーティストコラボ第3弾",
    body: "オンラインは即完。店舗代行の依頼が週末に集中しがち。",
    category: "Fashion",
    image_urls: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
    ],
  },
  {
    title: "インスタントカメラ：在庫不安定が続く",
    body: "チェキ・富士フィルムとも店舗によっては入荷待ち。予約代行が有効。",
    category: "Electronics",
    image_urls: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80",
    ],
  },
];

async function ensureBot(bot) {
  const { data: existing } = await supabase.auth.admin.getUserById(bot.id);
  if (existing?.user) {
    await supabase
      .from("users")
      .update({
        display_name: bot.display_name,
        country_code: bot.country_code,
        bio: bot.bio,
      })
      .eq("id", bot.id);
    return;
  }

  const { error } = await supabase.auth.admin.createUser({
    id: bot.id,
    email: bot.email,
    email_confirm: true,
    user_metadata: {
      full_name: bot.display_name,
      name: bot.display_name,
    },
  });

  if (error) {
    throw new Error(`createUser ${bot.email}: ${error.message}`);
  }

  await supabase
    .from("users")
    .update({
      display_name: bot.display_name,
      country_code: bot.country_code,
      bio: bot.bio,
    })
    .eq("id", bot.id);
}

async function clearSeed() {
  await supabase.from("wants").delete().eq("is_seed", true);
  await supabase.from("offers").delete().eq("is_seed", true);
  await supabase.from("trends").delete().eq("is_seed", true);
}

async function main() {
  console.log("Ensuring bot users…");
  for (const bot of BOTS) await ensureBot(bot);

  console.log("Removing previous seed rows…");
  await clearSeed();

  console.log("Inserting wants (ID buyers)…");
  const { error: wantsErr } = await supabase.from("wants").insert(
    WANTS.map((row) => ({
      ...row,
      user_id: JAKARTA_ID,
      status: "active",
      is_seed: true,
    })),
  );
  if (wantsErr) throw new Error(`wants: ${wantsErr.message}`);

  console.log("Inserting offers (JP proxies)…");
  const { error: offersErr } = await supabase.from("offers").insert(
    OFFERS.map((row) => ({
      ...row,
      user_id: TOKYO_ID,
      status: "active",
      is_seed: true,
    })),
  );
  if (offersErr) throw new Error(`offers: ${offersErr.message}`);

  console.log("Inserting trends…");
  const { error: trendsErr } = await supabase.from("trends").insert(
    TRENDS.map((row) => ({
      ...row,
      user_id: TOKYO_ID,
      status: "published",
      is_seed: true,
    })),
  );
  if (trendsErr) throw new Error(`trends: ${trendsErr.message}`);

  console.log(
    `Done. ${WANTS.length} wants, ${OFFERS.length} offers, ${TRENDS.length} trends.`,
  );
  console.log("Refresh http://localhost:3000/wants (and /offers, /trends).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
