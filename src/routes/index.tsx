import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { ArrowRightIcon, StarIcon } from "@/components/Icons";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n";
import { MapPin, Clock, Coffee, Wine, ChefHat, Instagram } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Stella Lounge — Cafe & Lounge Experience" },
      {
        name: "description",
        content:
          "Experience the finest cafe and lounge atmosphere in Kırklareli Merkez. Discover our menu of premium drinks, desserts, and shisha.",
      },
    ],
  }),
});

function Landing() {
  const { t } = useLanguage();

  return (
    <main className="w-full bg-background text-foreground overflow-x-hidden">
      <LanguageSwitcher />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Stella Cafe & Lounge"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center animate-fade-up">
          <div className="flex items-center gap-4 text-primary mb-6">
            <div className="h-[1px] w-8 bg-primary/50" />
            <span className="font-sans text-[11px] tracking-[0.4em] uppercase font-semibold">
              Kırklareli Merkez
            </span>
            <div className="h-[1px] w-8 bg-primary/50" />
          </div>

          <h1 className="font-sans text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white mb-4 drop-shadow-2xl">
            Stella
          </h1>
          <h2 className="font-sans text-xl sm:text-2xl md:text-4xl font-medium tracking-widest uppercase text-primary">
            Cafe & Lounge
          </h2>

          <p className="mt-8 max-w-xl font-sans text-base sm:text-lg text-foreground/80 leading-relaxed">
            {t("menu.subtitle") ||
              "Kırklareli'nin en seçkin noktasında, eşsiz tatlar ve kusursuz bir atmosfer."}
          </p>

          <Link
            to="/menu"
            className="mt-12 group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-primary/40 bg-card/80 backdrop-blur-sm px-10 py-4 shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
          >
            <span className="font-sans text-sm font-bold tracking-widest text-primary uppercase">
              Menüyü Keşfet
            </span>
            <ArrowRightIcon className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/80 to-transparent" />
        </div>
      </section>

      {/* The Experience Section */}
      <section className="relative py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-up">
            <h3 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight">
              Eşsiz Bir <span className="text-primary italic">Deneyim</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Özenle seçilmiş kahve çekirdekleri, el yapımı tatlılar ve imza kokteyllerimizle size
              sadece bir menü değil, unutulmaz bir atmosfer sunuyoruz. Stella Lounge'da her detay,
              kendinizi özel hissetmeniz için tasarlandı.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="flex flex-col gap-3">
                <Coffee className="h-8 w-8 text-primary" />
                <h4 className="font-bold text-lg">Premium Kahve</h4>
                <p className="text-sm text-muted-foreground">
                  Dünyanın en iyi bölgelerinden özenle seçilmiş çekirdekler.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Wine className="h-8 w-8 text-primary" />
                <h4 className="font-bold text-lg">İmza İçecekler</h4>
                <p className="text-sm text-muted-foreground">
                  Uzman miksologlarımızın ellerinden çıkan eşsiz tatlar.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <ChefHat className="h-8 w-8 text-primary" />
                <h4 className="font-bold text-lg">Gurme Lezzetler</h4>
                <p className="text-sm text-muted-foreground">
                  Günlük ve taze hazırlanan özel tatlılar ve atıştırmalıklar.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <StarIcon className="h-8 w-8 text-primary" />
                <h4 className="font-bold text-lg">Lüks Atmosfer</h4>
                <p className="text-sm text-muted-foreground">
                  Modern ve konforlu tasarımıyla kusursuz bir ortam.
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 shadow-2xl group animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <img
              src={heroImg}
              alt="Stella Atmosphere"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white text-xl font-medium tracking-wide border-l-2 border-primary pl-4">
                "Kırklareli'nin yeni buluşma noktası."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="border-t border-white/5 bg-card/30 relative py-24 sm:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-up">
          <div className="flex flex-col items-center justify-center gap-4">
            <MapPin className="h-12 w-12 text-primary" />
            <h3 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight">
              Bizi Ziyaret Edin
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 text-left bg-black/40 p-8 rounded-2xl border border-white/5 shadow-xl">
            <div className="space-y-4">
              <h4 className="font-bold text-xl text-primary flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Adres
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Kırklareli Merkez,
                <br />
                Cumhuriyet Meydanı, No: 1<br />
                Kırklareli / Türkiye
              </p>
              <a 
                href="https://share.google/3V6S6Y7FJLwnE8zn6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-semibold mt-2"
              >
                Haritada Gör <ArrowRightIcon className="h-3 w-3" />
              </a>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-xl text-primary flex items-center gap-2">
                <Clock className="h-5 w-5" /> Çalışma Saatleri
              </h4>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex justify-between">
                  <span>Pazartesi - Perşembe</span>
                  <span>09:00 - 00:00</span>
                </li>
                <li className="flex justify-between text-white font-medium">
                  <span>Cuma - Pazar</span>
                  <span>09:00 - 02:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col items-center gap-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-primary text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Online Menüyü İncele
            </Link>
            <p className="font-sans text-xs font-medium tracking-widest text-muted-foreground uppercase mt-4">
              Rezervasyon: +90 555 000 0000
            </p>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-muted-foreground tracking-widest uppercase">
        © 2026 Stella Cafe & Lounge. Tüm hakları saklıdır.
      </footer>
    </main>
  );
}
