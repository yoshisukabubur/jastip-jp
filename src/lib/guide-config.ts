/** Edit host name and contact URLs here or via env (see .env.example). */

export const GUIDE_HOST = {
  name: "管理人 / Host",
  languages: "日本語 · Bahasa Indonesia · English (basic)",
  areas: "東京23区内を中心（要相談）",
  slots: "土日のみ · 週1〜2枠 · 1日1組まで",
  leadDays: "最低3日前までの予約",
  lineUrl: process.env.NEXT_PUBLIC_GUIDE_LINE_URL ?? null,
  whatsappUrl: process.env.NEXT_PUBLIC_GUIDE_WHATSAPP_URL ?? null,
};

/** 方式A: 空きはカレンダー＋問い合わせで手動管理（サイトに自動枠は出さない） */
export const GUIDE_AVAILABILITY = {
  daysJa: "土曜・日曜のみ（平日・祝日は原則お断り）",
  daysId: "Hanya Sabtu & Minggu (hari kerja biasanya tidak)",
  openNoteJa:
    "管理人が「受付中」の週の土日だけ案内できます。開いていない週・日は対応できません。",
  openNoteId:
    "Tur hanya saat host buka — bukan setiap akhir pekan otomatis.",
  howToBookJa:
    "下のメールフォームから希望日（土日）を送ってください。管理人がカレンダーを見て OK / 別日 / お断りを返します。",
  howToBookId:
    "Kirim tanggal via formulir email; host cek kalender lalu konfirmasi.",
  hostCalendarTipJa:
    "（運営）Googleカレンダーに空いている土日だけ「Guide: available」と入れて管理。",
};

export const GUIDE_PLANS = [
  {
    id: "half",
    nameJa: "Tokyo Half",
    nameId: "Setengah hari",
    duration: "3.5時間",
    priceYen: 18_000,
    priceIdrNote: "〜Rp 1,8–2,1 juta",
    badge: null as string | null,
    highlights: ["1エリア集中", "初めての東京向け"],
  },
  {
    id: "full",
    nameJa: "Tokyo Full",
    nameId: "Satu hari penuh",
    duration: "約7時間",
    priceYen: 32_000,
    priceIdrNote: "〜Rp 3,2–3,7 juta",
    badge: "おすすめ / Populer",
    highlights: ["2エリアまで", "観光＋軽い買い物"],
  },
  {
    id: "shopping",
    nameJa: "Shopping focus",
    nameId: "Fokus belanja",
    duration: "約7時間",
    priceYen: 35_000,
    priceIdrNote: "〜Rp 3,5–4,0 juta",
    badge: "Jastip向け",
    highlights: ["コスメ・文具・限定店", "Wants/Offerと相性◎"],
  },
] as const;

export const GUIDE_SPOTS = [
  { title: "浅草 / Asakusa", note: "寺社・土産" },
  { title: "秋葉原 / Akihabara", note: "アニメ・電気街" },
  { title: "渋谷・原宿", note: "ストリート・カフェ" },
  { title: "コスメ・ドラッグ", note: "まとめ買い相談" },
  { title: "Loft・Tokyu Hands", note: "文具・雑貨" },
  { title: "ポケセン・カプセル", note: "限定グッズ" },
];

export const GUIDE_TIMELINE = [
  { time: "10:00", label: "集合 / Meet" },
  { time: "12:00", label: "昼食（各自負担）/ Lunch" },
  { time: "15:00", label: "ショップ・観光 / Explore" },
  { time: "17:00", label: "終了 / Finish" },
];

export const GUIDE_FAQ = [
  {
    q: "平日は案内できますか？",
    a: "原則できません。対応は土曜・日曜のみです。例外は個別相談のみ。",
  },
  {
    q: "空き日はどう確認しますか？",
    a: "サイトのメール問い合わせフォームから希望日（土日）を送ってください。管理人が空きをメールで返答します。",
  },
  {
    q: "土日でも断られることはありますか？",
    a: "はい。その週に管理人が受付を開いていない、または枠が埋まっている場合があります。",
  },
  {
    q: "料金に交通費は含まれますか？",
    a: "含まれません。電車・タクシー・入場料・食事は各自の実費です。",
  },
  {
    q: "届く日・買い物日は保証されますか？",
    a: "いいえ。案内日は目安です。天候・在庫・混雑で変わる場合があります。",
  },
  {
    q: "キャンセルは？",
    a: "3日前まで無料、以降は協議（ルールは確定時に共有）。",
  },
  {
    q: "子ども連れは？",
    a: "要相談。プラン・歩行量に合わせて調整します。",
  },
];
