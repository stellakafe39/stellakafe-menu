-- ─────────────────────────────────────────────────────────────────────────
-- Migration: fix menu_items — run this in Supabase → SQL Editor → Run
-- Step 1: remove phantom rows with null IDs (inserted before client-side
--         UUID fix; they are invisible in the app but waste space)
-- Step 2: map Turkish display-name categories → correct slug IDs
-- ─────────────────────────────────────────────────────────────────────────

-- 0. Remove phantom rows with null ID
DELETE FROM menu_items WHERE id IS NULL;


UPDATE menu_items SET category = 'snacks'          WHERE category = 'Atıştırmalıklar';
UPDATE menu_items SET category = 'toasts_burgers'  WHERE category = 'Tostlar ve Burgerler';
UPDATE menu_items SET category = 'pasta_pizzas'    WHERE category IN ('Makarnalar', 'Pizzalar');
UPDATE menu_items SET category = 'main_courses'    WHERE category IN ('Etler ve Izgaralar', 'Tavuk Lezzetleri');
UPDATE menu_items SET category = 'salads'          WHERE category = 'Salatalar';
UPDATE menu_items SET category = 'breakfast_soups' WHERE category = 'Çorbalar & Kahvaltı';
UPDATE menu_items SET category = 'desserts'        WHERE category = 'Tatlılar';
UPDATE menu_items SET category = 'hot_drinks'      WHERE category IN ('Sıcak İçecekler', 'Kahveler');
UPDATE menu_items SET category = 'hot_choco'       WHERE category = 'Sıcak Çikolatalar';
UPDATE menu_items SET category = 'cold_drinks'     WHERE category = 'Soğuk İçecekler';

-- Verify — should return 0 rows when done:
SELECT DISTINCT category FROM menu_items
WHERE category NOT IN (
  'snacks','toasts_burgers','pasta_pizzas','main_courses','salads',
  'breakfast_soups','desserts','hot_drinks','turkish_coffee','espresso',
  'hot_choco','cold_coffee','frappe','cold_drinks','cocktails'
);
