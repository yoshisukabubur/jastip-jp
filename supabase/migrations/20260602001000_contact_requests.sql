create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.users (id) on delete cascade,
  recipient_user_id uuid not null references public.users (id) on delete cascade,
  listing_type text not null check (listing_type in ('want', 'offer')),
  listing_id uuid not null,
  message text not null,
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists contact_requests_recipient_created_idx
  on public.contact_requests (recipient_user_id, created_at desc);

alter table public.contact_requests enable row level security;

create policy contact_requests_insert_own on public.contact_requests
  for insert
  to authenticated
  with check (auth.uid() = sender_id);

create policy contact_requests_select_sender_or_recipient on public.contact_requests
  for select
  to authenticated
  using (auth.uid() = sender_id or auth.uid() = recipient_user_id);

grant select, insert on table public.contact_requests to authenticated;
grant select, insert, update, delete on table public.contact_requests to service_role;
