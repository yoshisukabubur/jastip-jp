-- Allow server-side seed/admin scripts that authenticate with service role keys.
grant usage on schema public to service_role;

grant select, insert, update, delete on table public.users to service_role;
grant select, insert, update, delete on table public.wants to service_role;
grant select, insert, update, delete on table public.offers to service_role;
grant select, insert, update, delete on table public.trends to service_role;
