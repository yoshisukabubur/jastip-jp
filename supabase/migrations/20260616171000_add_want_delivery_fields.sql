alter table public.wants
  add column if not exists delivery_city text,
  add column if not exists delivery_region text,
  add column if not exists delivery_note text;
