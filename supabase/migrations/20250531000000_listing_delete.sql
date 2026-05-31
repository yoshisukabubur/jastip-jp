-- Allow owners to delete their wants / offers

create policy wants_delete_own on public.wants
  for delete
  to authenticated
  using (auth.uid() = user_id);

create policy offers_delete_own on public.offers
  for delete
  to authenticated
  using (auth.uid() = user_id);

grant delete on table public.wants to authenticated;
grant delete on table public.offers to authenticated;
