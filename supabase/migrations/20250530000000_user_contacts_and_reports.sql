-- Move contact fields off public.users; add reports. Simpler bulletin-board model.

-- ---------------------------------------------------------------------------
-- user_contacts (logged-in users only — not readable by anon)
-- ---------------------------------------------------------------------------
create table if not exists public.user_contacts (
  user_id uuid primary key references public.users (id) on delete cascade,
  whatsapp_url text,
  line_url text,
  telegram_url text,
  contact_note text,
  updated_at timestamptz not null default now()
);

insert into public.user_contacts (user_id, whatsapp_url, line_url, telegram_url, contact_note)
select id, whatsapp_url, line_url, telegram_url, contact_note
from public.users
where whatsapp_url is not null
   or line_url is not null
   or telegram_url is not null
   or contact_note is not null
on conflict (user_id) do update set
  whatsapp_url = excluded.whatsapp_url,
  line_url = excluded.line_url,
  telegram_url = excluded.telegram_url,
  contact_note = excluded.contact_note;

alter table public.users
  drop column if exists whatsapp_url,
  drop column if exists line_url,
  drop column if exists telegram_url,
  drop column if exists contact_note,
  drop column if exists subscription_expires_at,
  drop column if exists is_proxy_pro;

alter table public.user_contacts enable row level security;

create policy user_contacts_select_authenticated on public.user_contacts
  for select
  to authenticated
  using (true);

create policy user_contacts_insert_own on public.user_contacts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy user_contacts_update_own on public.user_contacts
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on table public.user_contacts to authenticated;
grant select, insert, update, delete on table public.user_contacts to service_role;

-- ---------------------------------------------------------------------------
-- reports (community safety)
-- ---------------------------------------------------------------------------
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.users (id) on delete set null,
  listing_type text not null check (
    listing_type in ('want', 'offer', 'trend', 'user', 'other')
  ),
  listing_id uuid,
  reason text not null,
  details text,
  created_at timestamptz not null default now()
);

create index if not exists reports_created_at_idx on public.reports (created_at desc);

alter table public.reports enable row level security;

create policy reports_insert_authenticated on public.reports
  for insert
  to authenticated
  with check (auth.uid() = reporter_id);

grant insert on table public.reports to authenticated;
grant select, insert, delete on table public.reports to service_role;

-- Optional cleanup from subscription experiment (safe if missing)
drop table if exists public.contact_reveals;
