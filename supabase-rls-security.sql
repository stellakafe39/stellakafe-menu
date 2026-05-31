-- ─────────────────────────────────────────────────────────────────
--  Stella Lounge — Row Level Security Setup
--  Run in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────────

-- ── menu_items ────────────────────────────────────────────────────
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Public can read all items (needed for the public menu page)
CREATE POLICY "public_read_menu_items"
  ON public.menu_items FOR SELECT
  USING (true);

-- Only authenticated admins can insert/update/delete
CREATE POLICY "auth_write_menu_items"
  ON public.menu_items FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ── settings ──────────────────────────────────────────────────────
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_settings"
  ON public.settings FOR SELECT
  USING (true);

CREATE POLICY "auth_write_settings"
  ON public.settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ── categories (created by supabase-categories-migration.sql) ────
-- Already has RLS — no action needed.
-- Run supabase-categories-migration.sql first if you haven't already.
