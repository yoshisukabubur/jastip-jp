-- JastipJP core schema: profiles, listings, trends, RLS

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- public.users (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text,
  country_code text,
  bio text,
  whatsapp_url text,
  line_url text,
  telegram_url text,
  contact_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_set_updated_at
  before update on public.users
  for each row
  execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      nullif(split_part(coalesce(new.email, ''), '@', 1), '')
    ),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- wants / offers (classified-style listings)
-- ---------------------------------------------------------------------------
create table public.wants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  description text,
  image_urls jsonb not null default '[]'::jsonb,
  category text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger wants_set_updated_at
  before update on public.wants
  for each row
  execute procedure public.set_updated_at();

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  description text,
  image_urls jsonb not null default '[]'::jsonb,
  category text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger offers_set_updated_at
  before update on public.offers
  for each row
  execute procedure public.set_updated_at();

-- ---------------------------------------------------------------------------
-- trends (curated / team posts; MVP: author owns row)
-- ---------------------------------------------------------------------------
create table public.trends (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  body text,
  image_urls jsonb not null default '[]'::jsonb,
  category text,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trends_set_updated_at
  before update on public.trends
  for each row
  execute procedure public.set_updated_at();

create index wants_user_id_idx on public.wants (user_id);
create index wants_created_at_idx on public.wants (created_at desc);
create index offers_user_id_idx on public.offers (user_id);
create index offers_created_at_idx on public.offers (created_at desc);
create index trends_created_at_idx on public.trends (created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.users enable row level security;
alter table public.wants enable row level security;
alter table public.offers enable row level security;
alter table public.trends enable row level security;

-- users: public read; owners update profile
create policy users_select_public on public.users
  for select
  using (true);

create policy users_update_own on public.users
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- wants / offers: public read; owners insert/update
create policy wants_select_public on public.wants
  for select
  using (true);

create policy wants_insert_own on public.wants
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy wants_update_own on public.wants
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy offers_select_public on public.offers
  for select
  using (true);

create policy offers_insert_own on public.offers
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy offers_update_own on public.offers
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- trends: public read; authenticated authors insert/update own rows
create policy trends_select_public on public.trends
  for select
  using (true);

create policy trends_insert_own on public.trends
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy trends_update_own on public.trends
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Grants (explicit for anon + authenticated clients)
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

grant select on table public.users to anon, authenticated;
grant update on table public.users to authenticated;

grant select on table public.wants to anon, authenticated;
grant insert, update on table public.wants to authenticated;

grant select on table public.offers to anon, authenticated;
grant insert, update on table public.offers to authenticated;

grant select on table public.trends to anon, authenticated;
grant insert, update on table public.trends to authenticated;
