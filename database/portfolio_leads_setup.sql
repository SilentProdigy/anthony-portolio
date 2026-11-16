-- Run this only in a dedicated Supabase project for the personal services website.
-- This file is an installation script, not a Supabase CLI migration.
-- Creates private lead data and a database-backed per-fingerprint hourly rate limiter.

create table if not exists public.portfolio_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (length(name) between 2 and 100),
  email text not null check (length(email) between 5 and 160),
  company text check (company is null or length(company) <= 200),
  solution text not null check (solution in (
    'GHL Specialist', 'Web Specialist', 'Graphic Design',
    'Social Media Management', 'Technical Support',
    'Multiple Services / Not Sure Yet'
  )),
  message text not null check (length(message) between 10 and 3000),
  source_path text not null default '/',
  consent_to_contact boolean not null check (consent_to_contact = true),
  status text not null default 'new' check (status in ('new','contacted','qualified','closed','spam')),
  notification_status text not null default 'pending' check (notification_status in ('pending','sent','failed')),
  acknowledgement_status text not null default 'pending' check (acknowledgement_status in ('pending','sent','failed'))
);

create index if not exists portfolio_leads_created_at_idx
  on public.portfolio_leads (created_at desc);

create index if not exists portfolio_leads_status_idx
  on public.portfolio_leads (status, created_at desc);

alter table public.portfolio_leads enable row level security;
revoke all on public.portfolio_leads from anon, authenticated;
grant select, insert, update on public.portfolio_leads to service_role;

-- Never store raw visitor IP addresses; the API hashes them with a server-only salt.
create table if not exists public.portfolio_lead_rate_limits (
  fingerprint text not null check (fingerprint ~ '^[a-f0-9]{64}$'),
  window_start timestamptz not null,
  attempts integer not null default 1,
  primary key (fingerprint, window_start)
);

alter table public.portfolio_lead_rate_limits enable row level security;
revoke all on public.portfolio_lead_rate_limits from anon, authenticated;
grant select, insert, update, delete on public.portfolio_lead_rate_limits to service_role;

create or replace function public.claim_portfolio_lead_slot(
  p_fingerprint text,
  p_limit integer default 5
) returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  current_attempts integer;
begin
  if p_fingerprint !~ '^[a-f0-9]{64}$' or p_limit < 1 or p_limit > 30 then
    return false;
  end if;

  insert into public.portfolio_lead_rate_limits (fingerprint, window_start, attempts)
  values (p_fingerprint, date_trunc('hour', now()), 1)
  on conflict (fingerprint, window_start)
  do update set attempts = public.portfolio_lead_rate_limits.attempts + 1
  returning attempts into current_attempts;

  return current_attempts <= p_limit;
end;
$$;

revoke all on function public.claim_portfolio_lead_slot(text, integer) from public, anon, authenticated;
grant execute on function public.claim_portfolio_lead_slot(text, integer) to service_role;

-- Older rate-limit windows can be removed periodically via a trusted admin query:
-- delete from public.portfolio_lead_rate_limits where window_start < now() - interval '7 days';

-- Verify table RLS is enabled:
-- select relname, relrowsecurity from pg_class
-- where relname in ('portfolio_leads', 'portfolio_lead_rate_limits');
