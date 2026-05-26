import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { categories, type Category, type Item } from "@/lib/menu-data";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n";
import {
  ArrowLeftIcon,
  CocktailIcon,
  CupIcon,
  DessertIcon,
  GlassIcon,
  PlateIcon,
  ShishaIcon,
} from "@/components/Icons";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Instagram, MapPin, X } from "lucide-react";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Stella Lounge — Menü" },
    ],
  }),
});

const iconFor: Record<string, React.FC<{ className?: string }>> = {
  snacks: PlateIcon,
  toasts_burgers: PlateIcon,
  pasta_pizzas: PlateIcon,
  main_courses: PlateIcon,
  salads: PlateIcon,
  breakfast_soups: PlateIcon,
  desserts: DessertIcon,
  hot_drinks: CupIcon,
  turkish_coffee: CupIcon,
  espresso: CupIcon,
  hot_choco: CupIcon,
  cold_coffee: GlassIcon,
  frappe: GlassIcon,
  cold_drinks: GlassIcon,
};

function MenuPage() {
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const { t, language } = useLanguage();

  return (
    <main className="min-h-[100svh] bg-background text-foreground flex flex-col">
      <LanguageSwitcher />
      {/* Header */}
      <header className="relative px-6 pt-12 pb-8 text-center flex-shrink-0">
        <Link
          to="/"
          className="absolute left-5 top-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">Geri</span>
        </Link>

        <div className="flex flex-col items-center gap-2 animate-fade-up">
          <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-4">
            Stella Menu
          </h1>
          <div className="h-px w-12 bg-primary/50 mt-2" />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 pb-24">
        {!activeCatId ? (
          /* Categories Grid View */
          <section className="mx-auto max-w-4xl px-4 py-4 animate-fade-up">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => {
                const Icon = iconFor[cat.id] ?? PlateIcon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCatId(cat.id)}
                    className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:border-primary/40 overflow-hidden"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500 z-10">
                      <Icon className="h-7 w-7 text-primary group-hover:text-black transition-colors" />
                    </div>
                    <span className="font-sans text-sm font-bold tracking-wide text-center z-10">
                      {cat.title?.[language] || cat.title?.["TR"]}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          /* Horizontal Tabs & Product List View */
          <div className="animate-fade-up">
            <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50 py-3 px-4 shadow-sm">
              <div className="flex items-center gap-4 max-w-2xl mx-auto">
                <button 
                  onClick={() => setActiveCatId(null)}
                  className="flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-card border border-border hover:border-primary/50 text-foreground transition-all"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                  {categories.map((cat) => {
                    const isActive = activeCatId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCatId(cat.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all duration-300 border text-sm font-semibold tracking-wide ${
                          isActive 
                            ? "bg-primary text-black border-primary shadow-[0_0_10px_rgba(212,175,55,0.3)]" 
                            : "bg-card text-muted-foreground border-transparent hover:text-foreground"
                        }`}
                      >
                        {cat.title?.[language] || cat.title?.["TR"]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <section className="mx-auto max-w-2xl px-4 py-8">
              <div className="mb-8 text-center animate-fade-up">
                <h2 className="text-2xl font-bold tracking-tight text-primary">
                  {categories.find((c) => c.id === activeCatId)?.title?.[language] || categories.find((c) => c.id === activeCatId)?.title?.["TR"]}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {categories.find((c) => c.id === activeCatId)?.subtitle?.[language] || categories.find((c) => c.id === activeCatId)?.subtitle?.["TR"]}
                </p>
              </div>

              <ul className="grid gap-4">
                {categories
                  .find((c) => c.id === activeCatId)
                  ?.items.map((item, i) => (
                    <ProductCard
                      key={`${activeCatId}-${i}`}
                      item={item}
                      delay={i * 0.05}
                      language={language}
                    />
                  ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function ProductCard({ item, delay, language }: { item: Item; delay: number; language: string }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <li
          className="group relative flex gap-4 p-3 rounded-2xl bg-card border border-border/50 shadow-sm cursor-pointer hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-fade-up"
          style={{ animationDelay: `${delay}s` }}
        >
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
            <img
              src={item.img}
              alt={item.name[language] || item.name["TR"]}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-sans text-base sm:text-lg font-bold text-foreground line-clamp-2 leading-tight">
                {item.name[language] || item.name["TR"]}
              </h3>
              <span className="font-sans text-sm font-bold tracking-wide text-primary whitespace-nowrap mt-0.5">
                {item.price}
              </span>
            </div>
            <div className="my-2 h-px w-full bg-border" />
            <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
              {item.desc[language] || item.desc["TR"]}
            </p>
          </div>
        </li>
      </DrawerTrigger>
      <DrawerContent className="bg-card border-border/50 text-foreground outline-none">
        <div className="mx-auto w-full max-w-md pb-8">
          <div className="relative w-full aspect-square max-h-[40vh] overflow-hidden rounded-t-[10px]">
            <img 
              src={item.img} 
              alt={item.name[language] || item.name["TR"]} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <DrawerClose className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur text-white hover:bg-black/80 transition-colors">
              <X className="h-5 w-5" />
            </DrawerClose>
          </div>
          <div className="px-6 pt-4 pb-2">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h2 className="text-2xl font-bold tracking-tight">
                {item.name[language] || item.name["TR"]}
              </h2>
              <span className="text-xl font-bold text-primary whitespace-nowrap">
                {item.price}
              </span>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              {item.desc[language] || item.desc["TR"]}
            </p>
          </div>
          <div className="px-6 mt-6">
             <DrawerClose className="w-full py-4 rounded-xl bg-primary text-black font-bold uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all">
                Kapat
             </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
