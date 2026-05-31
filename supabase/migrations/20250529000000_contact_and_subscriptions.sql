-- Contact reveals + subscription flags (payments wired later)

alter table public.users
  add column if not exists subscription_expires_at timestamptz,
  add column if not exists is_proxy_pro boolean not null default false;

create table if not exists public.contact_reveals (
  id uuid primary key default gen_random_uuid(),
  viewer_id uuid not null references public.users (id) on delete cascade,
  listing_type text not null check (listing_type in ('want', 'offer')),
  listing_id uuid not null,
  created_at timestamptz not null default now(),
  unique (viewer_id, listing_type, listing_id)
);

create index if not exists contact_reveals_viewer_created_idx
  on public.contact_reveals (viewer_id, created_at desc);

alter table public.contact_reveals enable row level security;

create policy contact_reveals_select_own on public.contact_reveals
  for select
  to authenticated
  using (auth.uid() = viewer_id);

create policy contact_reveals_insert_own on public.contact_reveals
  for insert
  to authenticated
  with check (auth.uid() = viewer_id);

grant select, insert on table public.contact_reveals to authenticated;

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.contact_reveals to service_role;
