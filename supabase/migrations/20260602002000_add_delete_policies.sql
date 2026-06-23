-- Allow owners to delete their own listings.

drop policy if exists wants_delete_own on public.wants;
create policy wants_delete_own on public.wants
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists offers_delete_own on public.offers;
create policy offers_delete_own on public.offers
for delete
to authenticated
using (auth.uid() = user_id);

grant delete on table public.wants to authenticated;
grant delete on table public.offers to authenticated;
