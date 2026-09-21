create table if not exists public.portfolio_content (
  id text primary key,
  projects jsonb not null default '[]'::jsonb,
  education jsonb not null default '[]'::jsonb,
  assets jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;

insert into public.portfolio_content (id)
values ('main')
on conflict (id) do nothing;