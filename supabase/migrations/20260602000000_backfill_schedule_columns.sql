-- Backfill schedule columns for environments that ran only the initial schema.
alter table public.wants
  add column if not exists need_by_on date,
  add column if not exists timing_flexible boolean not null default false;

alter table public.offers
  add column if not exists shop_in_japan_on date,
  add column if not exists heading_to_indonesia_on date,
  add column if not exists order_cutoff_on date,
  add column if not exists schedule_note text;
