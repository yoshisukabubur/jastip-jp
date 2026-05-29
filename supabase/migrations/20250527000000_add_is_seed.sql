-- Mark demo / bot posts for easy cleanup or filtering
alter table public.wants add column if not exists is_seed boolean not null default false;
alter table public.offers add column if not exists is_seed boolean not null default false;
alter table public.trends add column if not exists is_seed boolean not null default false;

create index if not exists wants_is_seed_idx on public.wants (is_seed) where is_seed = true;
create index if not exists offers_is_seed_idx on public.offers (is_seed) where is_seed = true;
create index if not exists trends_is_seed_idx on public.trends (is_seed) where is_seed = true;
