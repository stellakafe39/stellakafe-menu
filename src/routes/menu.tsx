import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useTransition, memo } from "react";
import { categories, type Item } from "@/lib/menu-data";
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

function MenuPage() {
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { language } = useLanguage();

  const handleSetCat = (id: string | null) => {
    startTransition(() => setActiveCatId(id));
  };

  const activeCat = categories.find((c) => c.id === activeCatId);

  return (
    <main className="min-h-[100svh] bg-background text-foreground flex flex-col">
      <Navbar />

      {!activeCatId ? (
        /* ═══════════════════════ CATEGORIES GRID ═══════════════════════ */
        <div className="flex-1 flex flex-col pt-20">
          <header className="px-5 sm:px-8 pt-10 pb-8 text-center animate-fade-up">
            <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-primary/65">Stella</span>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-white mt-1">Menü</h1>
            <div className="h-px w-10 bg-primary/40 mx-auto mt-4" />
          </header>

          <section
            className="mx-auto w-full max-w-5xl px-4 sm:px-6 pb-24 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {categories.map((cat, i) => {
                const Icon = iconFor[cat.id] ?? PlateIcon;
                const bg = catBg[cat.id] ?? heroImg;
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
                      src={bg}
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
        </div>
      ) : (
        /* ═══════════════════════ PRODUCTS LIST ═══════════════════════ */
        <div className="flex-1 flex flex-col pt-16">
          {/* Sticky tab bar */}
          <div className="sticky top-16 z-30 bg-background/92 backdrop-blur-xl border-b border-white/[0.06]">
            <div className="flex items-center gap-3 max-w-2xl mx-auto px-4 py-3">
              <button
                onClick={() => handleSetCat(null)}
                className="h-9 w-9 shrink-0 flex items-center justify-center rounded-full bg-card border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-all duration-300"
                aria-label="Geri"
              >
                <ArrowLeftIcon className="h-4 w-4" />
              </button>
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                {categories.map((cat) => {
                  const active = activeCatId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleSetCat(cat.id)}
                      className={`flex-shrink-0 px-4 py-1.5 rounded-full transition-all duration-300 border text-[11px] font-semibold tracking-wide ${
                        active
                          ? "bg-primary text-black border-primary shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                          : "bg-card text-muted-foreground border-border/50 hover:text-foreground hover:border-border"
                      }`}
                    >
                      {cat.title?.[language] || cat.title?.["TR"]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Category title */}
          <div className="text-center py-7 px-4">
            <h2 className="font-display text-3xl sm:text-4xl font-light text-white">
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
          <section key={activeCatId} className="mx-auto w-full max-w-2xl px-4 pb-28 animate-cat-in contain-content">
            <ul className="grid gap-2.5">
              {activeCat?.items.map((item, i) => (
                <ProductCard
                  key={i}
                  item={item}
                  language={language}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </ul>
          </section>
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
              <div className="relative w-full overflow-hidden rounded-t-[10px]" style={{ height: "min(42vh,280px)" }}>
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
                  <h2 className="font-display text-2xl sm:text-3xl font-light text-white leading-tight">
                    {selectedItem.name[language] || selectedItem.name["TR"]}
                  </h2>
                  <span className="font-sans text-xl font-bold text-primary whitespace-nowrap mt-1 shrink-0">
                    {selectedItem.price}
                  </span>
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

// memo → skip re-render when other state (selectedItem, activeCatId) changes
const ProductCard = memo(function ProductCard({
  item,
  language,
  onClick,
}: {
  item: Item;
  language: string;
  onClick: () => void;
}) {
  const name = item.name[language] || item.name["TR"];
  const desc = item.desc[language] || item.desc["TR"];

  return (
    <li
      className="group relative flex gap-3 p-3 rounded-xl bg-card border border-border/40 cursor-pointer hover:border-primary/25 hover:bg-card/80 transition-all duration-300"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Thumbnail */}
      <div className="relative h-[88px] w-[88px] sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
        <img
          src={item.img}
          alt={name}
          loading="lazy"
          decoding="async"
          width={96}
          height={96}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-sans text-sm sm:text-[15px] font-semibold text-foreground leading-snug line-clamp-2">
            {name}
          </h3>
          <span className="font-sans text-sm font-bold text-primary whitespace-nowrap mt-px shrink-0">
            {item.price}
          </span>
        </div>
        <div className="h-px w-full bg-border/50 mb-2" />
        <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {desc}
        </p>
      </div>
    </li>
  );
});
