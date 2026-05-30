import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useTransition, memo, useMemo, useEffect } from "react";
import { categories, type Item } from "@/lib/menu-data";
import { useAdminItems } from "@/lib/admin-store";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import {
  ArrowLeftIcon,
  CocktailIcon,
  CupIcon,
  DessertIcon,
  GlassIcon,
  PlateIcon,
  ShishaIcon,
} from "@/components/Icons";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { Footer } from "@/components/Footer";
import { X } from "lucide-react";

// Asset images for category card backgrounds
import c1Img from "@/assets/c1.jpg";
import c2Img from "@/assets/c2.jpg";
import d1Img from "@/assets/d1.jpg";
import g1Img from "@/assets/g1.jpg";
import g2Img from "@/assets/g2.jpg";
import h1Img from "@/assets/h1.jpg";
import h2Img from "@/assets/h2.jpg";
import h3Img from "@/assets/h3.jpg";
import h4Img from "@/assets/h4.jpg";
import h5Img from "@/assets/h5.jpg";
import r1Img from "@/assets/r1.jpg";
import r2Img from "@/assets/r2.jpg";
import r3Img from "@/assets/r3.jpg";
import r4Img from "@/assets/r4.jpg";
import r5Img from "@/assets/r5.jpg";
import s1Img from "@/assets/s1.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Stella Lounge — Menü" },
      { name: "description", content: "Stella Cafe & Lounge'un tüm menüsü. Atıştırmalıklar, pizzalar, burgerler, kokteyller, kahveler ve nargile." },
    ],
  }),
});


const catBg: Record<string, string> = {
  snacks:          r1Img,
  toasts_burgers:  r2Img,
  pasta_pizzas:    r3Img,
  main_courses:    r4Img,
  salads:          r5Img,
  breakfast_soups: h1Img,
  desserts:        d1Img,
  hot_drinks:      h2Img,
  turkish_coffee:  h3Img,
  espresso:        h4Img,
  hot_choco:       h5Img,
  cold_coffee:     c1Img,
  frappe:          c2Img,
  cold_drinks:     g1Img,
  cocktails:       g2Img,
  shisha:          s1Img,
};

const iconFor: Record<string, React.FC<{ className?: string }>> = {
  snacks:          PlateIcon,
  toasts_burgers:  PlateIcon,
  pasta_pizzas:    PlateIcon,
  main_courses:    PlateIcon,
  salads:          PlateIcon,
  breakfast_soups: PlateIcon,
  desserts:        DessertIcon,
  hot_drinks:      CupIcon,
  turkish_coffee:  CupIcon,
  espresso:        CupIcon,
  hot_choco:       CupIcon,
  cold_coffee:     GlassIcon,
  frappe:          GlassIcon,
  cold_drinks:     GlassIcon,
  cocktails:       CocktailIcon,
  shisha:          ShishaIcon,
};

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || '';

// Fallback rate used until the live fetch resolves (or if it fails)
const EUR_RATE_FALLBACK = 37;

function buildEurStr(price: string, rate: number): string {
  const nums = [...price.matchAll(/\d+/g)].map(m => parseInt(m[0], 10));
  if (!nums.length) return '';
  const eurs = nums.map(n => Math.ceil(n / rate));
  return eurs.length === 1
    ? `~${eurs[0]} €`
    : `~${eurs[0]}-${eurs[eurs.length - 1]} €`;
}

// Fetches live EUR/TRY rate from Frankfurter (free, no API key).
// Returns fallback immediately; updates silently when response arrives.
function useEurRate(): number {
  const [rate, setRate] = useState(EUR_RATE_FALLBACK);
  useEffect(() => {
    fetch('https://api.frankfurter.app/latest?from=EUR&to=TRY')
      .then(r => r.json())
      .then((data: { rates?: { TRY?: number } }) => {
        const live = data?.rates?.TRY;
        if (live && live > 0) setRate(live);
      })
      .catch(() => { /* silent — fallback rate stays */ });
  }, []);
  return rate;
}

function MenuPage() {
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { language } = useLanguage();
  const { items: dbItems } = useAdminItems();
  const eurRate = useEurRate();

  // name-based img lookup: works regardless of how DB organises categories
  const liveCategories = useMemo(() => {
    if (!dbItems.length) return categories;

    // Build lowercase name → img_url map from all DB items
    const imgByName = new Map<string, string>();
    for (const item of dbItems) {
      if (item.img) imgByName.set(item.name.toLowerCase().trim(), item.img);
    }

    const resolveImg = (staticName: string, fallback: string): string => {
      const lower = staticName.toLowerCase().trim();
      // 1. Exact match
      if (imgByName.has(lower)) return imgByName.get(lower)!;
      // 2. Strip "+ Patates" suffix (e.g. "Kaşarlı Tost + Patates" → "Kaşarlı Tost")
      const stripped = lower.replace(/\s*\+\s*patates\b/i, '').trim();
      if (imgByName.has(stripped)) return imgByName.get(stripped)!;
      // 3. DB name is a prefix of the static name
      for (const [dbName, img] of imgByName) {
        if (lower.startsWith(dbName + ' ') || lower === dbName) return img;
      }
      return fallback;
    };

    return categories.map(staticCat => ({
      ...staticCat,
      items: staticCat.items.map(item => ({
        ...item,
        img: resolveImg(item.name.TR, item.img),
      })),
    }));
  }, [dbItems]);

  // Hardcoded map from static category ID → actual Storage slug (derived from DB category names)
  const CAT_STORAGE_SLUG: Record<string, string> = {
    snacks:          'atistirmaliklar',
    toasts_burgers:  'tostlar-ve-burgerler',
    pasta_pizzas:    'pizzalar',
    main_courses:    'etler-ve-izgaralar',
    salads:          'salatalar',
    breakfast_soups: 'corbalar-kahvalti',
    desserts:        'tatlilar',
    hot_drinks:      'sicak-icecekler',
    turkish_coffee:  'kahveler',
    espresso:        'kahveler',
    hot_choco:       'sicak-cikolatalar',
    cold_coffee:     'soguk-icecekler',
    frappe:          'soguk-icecekler',
    cold_drinks:     'soguk-icecekler',
    cocktails:       'soguk-icecekler',
    shisha:          '',
  };

  const catStorageUrls = useMemo(() =>
    SUPABASE_URL
      ? Object.fromEntries(
          categories.map(c => [
            c.id,
            CAT_STORAGE_SLUG[c.id]
              ? `${SUPABASE_URL}/storage/v1/object/public/menu-images/categories/${CAT_STORAGE_SLUG[c.id]}.jpg`
              : '',
          ])
        )
      : {} as Record<string, string>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleSetCat = (id: string | null) => {
    startTransition(() => setActiveCatId(id));
  };

  const activeCat = liveCategories.find((c) => c.id === activeCatId);

  return (
    <main className="min-h-[100svh] bg-background text-foreground flex flex-col">
      <Navbar />

      {!activeCatId ? (
        /* ═══════════════════════ CATEGORIES GRID ═══════════════════════ */
        <div className="flex-1 flex flex-col pt-20">
          <header className="px-5 sm:px-8 pt-10 pb-8 text-center animate-fade-up">
            <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-primary/65">Stella</span>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-foreground mt-1">Menü</h1>
            <div className="h-px w-10 bg-primary/40 mx-auto mt-4" />
          </header>

          <section
            className="mx-auto w-full max-w-5xl px-4 sm:px-6 pb-8 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {liveCategories.map((cat, i) => {
                const Icon = iconFor[cat.id] ?? PlateIcon;
                const fallbackBg = catBg[cat.id] ?? heroImg;
                const storageBg = catStorageUrls[cat.id] ?? '';
                const title = cat.title?.[language] || cat.title?.["TR"];

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSetCat(cat.id)}
                    className="group relative aspect-[3/4] overflow-hidden rounded-xl focus:outline-none"
                    style={{ animationDelay: `${i * 0.03}s` }}
                    aria-label={title}
                  >
                    <img
                      src={storageBg || fallbackBg}
                      onError={(e) => { const el = e.target as HTMLImageElement; if (el.src !== fallbackBg) el.src = fallbackBg; }}
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/70" />
                    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/45 transition-colors duration-500" />
                    <div className="absolute top-3.5 left-3.5 h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-colors duration-500">
                      <Icon className="h-4 w-4 text-white/70 group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="font-display text-lg sm:text-xl text-white font-light leading-tight line-clamp-2">
                        {title}
                      </h2>
                      {cat.subtitle?.[language] && (
                        <p className="font-sans text-[10px] tracking-wider text-white/50 mt-1 line-clamp-1">
                          {cat.subtitle?.[language] || cat.subtitle?.["TR"]}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
          <Footer />
        </div>
      ) : (
        /* ═══════════════════════ PRODUCTS LIST ═══════════════════════ */
        <div className="flex-1 flex flex-col pt-16">
          {/* Sticky category strip */}
          <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-2xl border-b border-border/30">
            <div className="relative flex items-center gap-2.5 max-w-2xl mx-auto px-4 py-2.5">
              {/* Back button */}
              <button
                onClick={() => handleSetCat(null)}
                className="h-9 w-9 shrink-0 flex items-center justify-center rounded-full bg-card border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-all duration-300"
                aria-label="Geri"
              >
                <ArrowLeftIcon className="h-4 w-4" />
              </button>

              {/* Mini image cards */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {liveCategories.map((cat) => {
                  const active = activeCatId === cat.id;
                  const fallbackBg = catBg[cat.id] ?? heroImg;
                  const storageBg = catStorageUrls[cat.id] ?? '';
                  const Icon = iconFor[cat.id] ?? PlateIcon;
                  const title = cat.title?.[language] || cat.title?.["TR"];
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleSetCat(cat.id)}
                      aria-label={title}
                      className={`relative flex-shrink-0 overflow-hidden rounded-lg focus:outline-none transition-all duration-300 ${
                        active
                          ? "ring-1 ring-primary animate-cat-glow opacity-100 scale-105"
                          : "opacity-40 hover:opacity-70 hover:scale-[1.04]"
                      }`}
                      style={{ width: 54, height: 70 }}
                    >
                      <img
                        src={storageBg || fallbackBg}
                        onError={(e) => { const el = e.target as HTMLImageElement; if (el.src !== fallbackBg) el.src = fallbackBg; }}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1.5 px-0.5 gap-0.5">
                        <Icon
                          className={`h-3 w-3 shrink-0 ${active ? "text-primary" : "text-white/80"}`}
                        />
                        <span
                          className={`text-[7px] font-semibold leading-tight text-center line-clamp-2 ${
                            active ? "text-primary" : "text-white/80"
                          }`}
                        >
                          {title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right fade mask */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background to-transparent" />
            </div>
          </div>

          {/* Category title */}
          <div className="text-center py-7 px-4">
            <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground">
              {activeCat?.title?.[language] || activeCat?.title?.["TR"]}
            </h2>
            {activeCat?.subtitle?.[language] && (
              <p className="font-sans text-xs text-muted-foreground/70 mt-2 tracking-wider">
                {activeCat?.subtitle?.[language] || activeCat?.subtitle?.["TR"]}
              </p>
            )}
            <div className="h-px w-8 bg-primary/35 mx-auto mt-4" />
          </div>

          {/* Products — key forces remount → animate-cat-in replays */}
          <section key={activeCatId} className="mx-auto w-full max-w-2xl px-4 pb-8 animate-cat-in contain-content">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {activeCat?.items.map((item, i) => (
                <ProductCard
                  key={i}
                  item={item}
                  language={language}
                  rate={eurRate}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </ul>
          </section>
          <Footer />
        </div>
      )}

      {/* ── Single shared Drawer — no per-card Drawer mount cost ── */}
      <Drawer
        open={selectedItem !== null}
        onOpenChange={(open) => { if (!open) setSelectedItem(null); }}
      >
        <DrawerContent className="bg-card border-border/40 text-foreground outline-none">
          {selectedItem && (
            <div className="mx-auto w-full max-w-md pb-8">
              <div className="relative w-full overflow-hidden rounded-t-[10px]" style={{ height: "min(55vh,340px)" }}>
                <img
                  src={selectedItem.img}
                  alt={selectedItem.name[language] || selectedItem.name["TR"]}
                  className="w-full h-full object-cover"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <DrawerClose className="absolute top-3.5 right-3.5 h-8 w-8 flex items-center justify-center rounded-full bg-black/55 backdrop-blur text-white hover:bg-black/80 transition-colors">
                  <X className="h-4 w-4" />
                </DrawerClose>
              </div>
              <div className="px-6 pt-5">
                <div className="h-px w-8 bg-primary/60 mb-4" />
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground leading-tight">
                    {selectedItem.name[language] || selectedItem.name["TR"]}
                  </h2>
                  <PriceDisplay
                    price={selectedItem.price}
                    language={language}
                    rate={eurRate}
                    priceClass="font-sans text-xl font-bold text-primary mt-1"
                    eurClass="text-sm"
                  />
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {selectedItem.desc[language] || selectedItem.desc["TR"]}
                </p>
              </div>
              <div className="px-6 mt-7">
                <DrawerClose className="w-full py-3.5 rounded-xl bg-primary/10 border border-primary/30 text-primary font-sans font-bold uppercase tracking-[0.25em] text-[11px] hover:bg-primary hover:text-black transition-all duration-300">
                  Kapat
                </DrawerClose>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </main>
  );
}

function PriceDisplay({
  price, language, rate, priceClass, eurClass,
}: {
  price: string;
  language: string;
  rate: number;
  priceClass: string;
  eurClass: string;
}) {
  const eur = (language === 'BG' || language === 'GR') ? buildEurStr(price, rate) : '';
  return (
    <span className={`flex flex-col items-end shrink-0 ${priceClass}`}>
      <span className="whitespace-nowrap">{price}</span>
      {eur && (
        <span className={`whitespace-nowrap font-normal text-muted-foreground ${eurClass}`}>
          {eur}
        </span>
      )}
    </span>
  );
}

// memo → skip re-render when other state (selectedItem, activeCatId) changes
const ProductCard = memo(function ProductCard({
  item,
  language,
  rate,
  onClick,
}: {
  item: Item;
  language: string;
  rate: number;
  onClick: () => void;
}) {
  const name = item.name[language] || item.name["TR"];

  return (
    <li
      className="group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border/40 cursor-pointer hover:border-primary/30 transition-all duration-300"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={item.img}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-3 py-2.5">
        <h3 className="font-sans text-[13px] sm:text-sm font-semibold text-foreground leading-snug line-clamp-2">
          {name}
        </h3>
        <PriceDisplay
          price={item.price}
          language={language}
          rate={rate}
          priceClass="font-sans text-sm font-bold text-primary"
          eurClass="text-[10px]"
        />
      </div>
    </li>
  );
});
