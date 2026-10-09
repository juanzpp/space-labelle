-- Space LaBelle | Esquema inicial multiempresa (Supabase PostgreSQL)
-- Executar somente em projeto Supabase dedicado ao Space LaBelle.
create extension if not exists pgcrypto;

create table if not exists public.salons (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 slug text not null unique,
 owner_id uuid not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);

create table if not exists public.services (
 id uuid primary key default gen_random_uuid(),
 salon_id uuid not null references public.salons(id) on delete cascade,
 name text not null,
 price_cents integer not null check(price_cents >= 0),
 duration_minutes integer not null check(duration_minutes between 15 and 720),
 active boolean not null default true,
 created_at timestamptz not null default now(),
 unique(id,salon_id)
);

create table if not exists public.clients (
 id uuid primary key default gen_random_uuid(),
 salon_id uuid not null references public.salons(id) on delete cascade,
 name text not null,
 phone text not null,
 created_at timestamptz not null default now(),
 unique(id,salon_id)
);

create table if not exists public.appointments (
 id uuid primary key default gen_random_uuid(),
 salon_id uuid not null references public.salons(id) on delete cascade,
 service_id uuid not null,
 client_id uuid not null,
 start_at timestamptz not null,
 end_at timestamptz not null,
 status text not null default 'confirmed'
   check (status in ('confirmed','completed','cancelled')),
 price_cents integer not null check(price_cents >= 0),
 created_at timestamptz not null default now(),
 check(end_at > start_at),
 foreign key(service_id,salon_id) references public.services(id,salon_id),
 foreign key(client_id,salon_id) references public.clients(id,salon_id)
);
-- No mesmo salão, reservas ativas não podem se sobrepor.
create extension if not exists btree_gist;
alter table public.appointments
 add constraint appointments_no_overlap
 exclude using gist (
  salon_id with =,
  tstzrange(start_at,end_at,'[)') with &&
 ) where (status <> 'cancelled');

create table if not exists public.expenses (
 id uuid primary key default gen_random_uuid(),
 salon_id uuid not null references public.salons(id) on delete cascade,
 description text not null,
 amount_cents integer not null check(amount_cents > 0),
 occurred_at date not null default current_date
);

alter table public.salons enable row level security;
alter table public.services enable row level security;
alter table public.clients enable row level security;
alter table public.appointments enable row level security;
alter table public.expenses enable row level security;

create policy salons_owner_select on public.salons for select to authenticated
 using(owner_id = (select auth.uid()));
create policy salons_owner_insert on public.salons for insert to authenticated
 with check(owner_id = (select auth.uid()));
create policy salons_owner_update on public.salons for update to authenticated
 using(owner_id = (select auth.uid())) with check(owner_id = (select auth.uid()));

create policy services_owner_all on public.services for all to authenticated
 using(exists(select 1 from public.salons s where s.id=salon_id and s.owner_id=(select auth.uid())))
 with check(exists(select 1 from public.salons s where s.id=salon_id and s.owner_id=(select auth.uid())));
create policy clients_owner_all on public.clients for all to authenticated
 using(exists(select 1 from public.salons s where s.id=salon_id and s.owner_id=(select auth.uid())))
 with check(exists(select 1 from public.salons s where s.id=salon_id and s.owner_id=(select auth.uid())));
create policy appointments_owner_all on public.appointments for all to authenticated
 using(exists(select 1 from public.salons s where s.id=salon_id and s.owner_id=(select auth.uid())))
 with check(exists(select 1 from public.salons s where s.id=salon_id and s.owner_id=(select auth.uid())));
create policy expenses_owner_all on public.expenses for all to authenticated
 using(exists(select 1 from public.salons s where s.id=salon_id and s.owner_id=(select auth.uid())))
 with check(exists(select 1 from public.salons s where s.id=salon_id and s.owner_id=(select auth.uid())));

-- Public booking must use a rate-limited server endpoint / Edge Function.
-- Never expose customer phone numbers or give anon INSERT on clients/appointments.
