-- Run this in: Supabase Dashboard → SQL Editor → New Query

CREATE TABLE IF NOT EXISTS public.categories (
  id           TEXT        PRIMARY KEY,
  title_tr     TEXT        NOT NULL,
  title_bg     TEXT        NOT NULL DEFAULT '',
  title_gr     TEXT        NOT NULL DEFAULT '',
  subtitle_tr  TEXT        NOT NULL DEFAULT '',
  subtitle_bg  TEXT        NOT NULL DEFAULT '',
  subtitle_gr  TEXT        NOT NULL DEFAULT '',
  cover_img    TEXT        NOT NULL DEFAULT '',
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  active       BOOLEAN     NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Anyone can read active categories (needed by the public menu page)
CREATE POLICY "public_read_categories"
  ON public.categories FOR SELECT
  USING (true);

-- Only authenticated users (admins) can write
CREATE POLICY "auth_write_categories"
  ON public.categories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Seed with the 14 predefined categories so admins can edit their cover images
INSERT INTO public.categories (id, title_tr, title_bg, title_gr, subtitle_tr, subtitle_bg, subtitle_gr, cover_img, sort_order) VALUES
  ('snacks',          'Atıştırmalıklar',          'Снекс',               'Σνακ',              'Paylaşmalık lezzetler',             'Вкусни хапки',              'Νόστιμες μπουκιές',    '/categories/atistirmaliklar.png',          10),
  ('toasts_burgers',  'Tostlar & Burgerler',       'Тостове & Бургери',   'Τοστ & Μπέργκερ',   'Doyurucu sokak lezzetleri',         'Вкусни сандвичи',           'Νόστιμα σάντουιτς',    '/categories/tostlar-burgerler.png',        20),
  ('pasta_pizzas',    'Makarnalar & Pizzalar',      'Паста & Пица',        'Ζυμαρικά & Πίτσα',  'İtalyan esintisi',                  'Италиански вкус',           'Ιταλική γεύση',        '/categories/makarnalar-pizzalar.png',      30),
  ('main_courses',    'Ana Yemekler & Izgaralar',   'Основни Ястия',       'Κυρίως Πιάτα',      'Özenle hazırlanmış et ve tavuk',    'Месо и пиле',               'Κρέας και κοτόπουλο',  '/categories/ana-yemekler-izgaralar.png',   40),
  ('salads',          'Salatalar',                  'Салати',              'Σαλάτες',           'Taze ve sağlıklı seçenekler',       'Пресни и здравословни',     'Φρέσκα και υγιεινά',   '/categories/salatalar.png',                50),
  ('breakfast_soups', 'Çorbalar & Kahvaltı',        'Супи & Закуска',      'Σούπες & Πρωινό',   'Güne sıcak bir başlangıç',          'Топъл старт',               'Ζεστό ξεκίνημα',       '/categories/corbalar-kahvalti.png',        60),
  ('desserts',        'Tatlılar',                   'Десерти',             'Επιδόρπια',         'İmza tatlılarımız',                 'Сладки изкушения',          'Γλυκές απολαύσεις',    '/categories/tatlilar.png',                 70),
  ('hot_drinks',      'Sıcak İçecekler',            'Топли Напитки',       'Ζεστά Ροφήματα',    'İçinizi ısıtacak çay ve kahveler',  'Чай и кафе',                'Τσάι και καφές',       '/categories/sicak-icecekler.png',          80),
  ('turkish_coffee',  'Kumda Türk Kahveleri',       'Турско Кафе',         'Τουρκικός Καφές',   'Geleneksel kumda pişirim',          'Традиционно приготвено',    'Παραδοσιακά φτιαγμένος','/categories/kumda-turk-kahveleri.png',    90),
  ('espresso',        'Espresso Bazlı Kahveler',    'Еспресо Напитки',     'Ροφήματα Εσπρέσο',  'Dünya kahveleri',                   'Световни кафета',           'Παγκόσμιοι καφέδες',   '/categories/espresso-bazli-kahveler.png', 100),
  ('hot_choco',       'Sıcak Çikolatalar',          'Горещ Шоколад',       'Ζεστή Σοκολάτα',    'Kış aylarının vazgeçilmezi',        'За студените дни',          'Για τις κρύες μέρες',  '/categories/sicak-cikolatalar.png',        110),
  ('cold_coffee',     'Soğuk Kahveler',             'Студени Кафета',      'Κρύοι Καφέδες',     'Buz gibi serinletici',              'Освежаващи',                'Δροσιστικά',           '/categories/soguk-kahveler.png',           120),
  ('frappe',          'Frappeler',                  'Фрапета',             'Φραπέ',             'Buz gibi karışımlar',               'Студени смеси',             'Παγωμένα μείγματα',    '/categories/frappeler.png',                130),
  ('cold_drinks',     'Soğuk İçecekler & Frozen',   'Студени Напитки',     'Κρύα Ποτά',         'Limonata, Milkshake, Smoothie',     'Освежаващи напитки',        'Δροσιστικά ροφήματα',  '/categories/soguk-icecekler-frozen.png',   140)
ON CONFLICT (id) DO NOTHING;
