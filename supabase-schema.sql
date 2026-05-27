-- ============================================================
--  Stella Lounge — Supabase Database Schema
--  Supabase Dashboard → SQL Editor → Bu dosyayı yapıştır → Run
-- ============================================================

-- ── 1. menu_items tablosu ────────────────────────────────────
create table if not exists public.menu_items (
  id          uuid primary key default gen_random_uuid(),
  name_tr     text not null,
  name_bg     text not null default '',
  name_gr     text not null default '',
  desc_tr     text not null default '',
  desc_bg     text not null default '',
  desc_gr     text not null default '',
  category    text not null,
  price       text not null,
  img_url     text not null default '',
  available   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.menu_items enable row level security;

-- Herkese okuma izni (menü sayfası için)
create policy "public_read_menu_items"
  on public.menu_items for select
  using (true);

-- Giriş yapmış admin kullanıcısına tam erişim
create policy "authenticated_manage_menu_items"
  on public.menu_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ── 2. settings tablosu ─────────────────────────────────────
create table if not exists public.settings (
  key         text primary key,
  value       text not null default '',
  updated_at  timestamptz not null default now()
);

alter table public.settings enable row level security;

-- Herkese okuma izni (site ayarlarını göstermek için)
create policy "public_read_settings"
  on public.settings for select
  using (true);

-- Giriş yapmış admin kullanıcısına tam erişim
create policy "authenticated_manage_settings"
  on public.settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ── 3. Varsayılan site ayarları ──────────────────────────────
insert into public.settings (key, value) values
  ('venue_name',      'Stella Cafe & Lounge'),
  ('phone',           '+90 555 000 0000'),
  ('instagram',       'https://www.instagram.com/stella_cafe_lounge/'),
  ('address',         'Cumhuriyet Meydanı, No: 1, Kırklareli Merkez'),
  ('hours_weekday',   '09:00 – 00:00'),
  ('hours_weekend',   '09:00 – 02:00'),
  ('maintenance_mode','false')
on conflict (key) do nothing;
