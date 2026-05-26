import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import c1Img from "@/assets/c1.jpg";
import d1Img from "@/assets/d1.jpg";
import g1Img from "@/assets/g1.jpg";
import h1Img from "@/assets/h1.jpg";
import r1Img from "@/assets/r1.jpg";
import s1Img from "@/assets/s1.jpg";
import { ArrowRightIcon, StarIcon } from "@/components/Icons";
import { Navbar } from "@/components/Navbar";
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
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Stella Cafe & Lounge"
            className="h-full w-full object-cover"
            style={{ transform: "scale(1.04)" }}
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
        </div>

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
            opacity: 0.035,
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-4 mb-6 animate-fade-up"
            style={{ animationDelay: "0.08s" }}
          >
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-primary font-semibold">
              Kırklareli Merkez
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/60" />
          </div>

          {/* Display title */}
          <h1
            className="font-display font-light tracking-[0.05em] text-white leading-[0.9] animate-fade-up"
            style={{
              fontSize: "clamp(5.5rem, 18vw, 13rem)",
              animationDelay: "0.2s",
            }}
          >
            Stella
          </h1>

          {/* Subtitle */}
          <div
            className="mt-3 flex items-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.34s" }}
          >
            <div className="h-px w-8 bg-primary/35" />
            <h2 className="font-sans text-[10px] sm:text-xs tracking-[0.6em] uppercase text-primary font-medium">
              Cafe &amp; Lounge
            </h2>
            <div className="h-px w-8 bg-primary/35" />
          </div>

          {/* Description */}
          <p
            className="mt-10 max-w-xs sm:max-w-sm font-sans text-sm text-white/55 leading-relaxed tracking-wide animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            {t("menu.subtitle") ||
              "Kırklareli'nin en seçkin noktasında, eşsiz tatlar ve kusursuz bir atmosfer."}
          </p>

          {/* CTA */}
          <Link
            to="/menu"
            className="mt-12 group relative inline-flex items-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.65s" }}
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-primary/8 blur-xl group-hover:bg-primary/18 transition-all duration-700" />
            <div className="relative inline-flex items-center gap-3 border border-primary/45 rounded-full px-9 py-3.5 bg-black/25 backdrop-blur-sm hover:border-primary/80 hover:bg-primary/8 transition-all duration-500">
              <span className="font-sans text-[10px] font-bold tracking-[0.35em] text-primary uppercase">
                Menüyü Keşfet
              </span>
              <ArrowRightIcon className="h-3.5 w-3.5 text-primary transition-transform duration-400 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 animate-fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          <span className="font-sans text-[8px] tracking-[0.45em] text-white/30 uppercase">
            Keşfet
          </span>
          <div className="animate-scroll-bounce">
            <div className="w-px h-9 bg-gradient-to-b from-primary/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════════ */}
      <div className="border-y border-white/[0.06] bg-card/40 py-4 overflow-hidden">
        <div
          className="animate-marquee flex items-center gap-0 whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-sans text-[9px] tracking-[0.4em] uppercase text-primary/50 pr-14"
            >
              Premium Kahve · İmza İçecekler · Gurme Lezzetler · Lüks Atmosfer · Nargile
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-10 sm:mb-14 flex flex-col items-center text-center animate-fade-up">
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-primary/65 mb-3">
              Atmosfer
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-light leading-tight">
              Bir Dünya <em>Yaratıyoruz</em>
            </h2>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 h-[380px] sm:h-[540px] animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {/* Large feature image (left) */}
            <div className="col-span-2 row-span-2 relative overflow-hidden rounded-xl group">
              <img
                src={heroImg}
                alt="Stella Atmosphere"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-display text-xl sm:text-2xl text-white italic font-light leading-snug">
                  "Kırklareli'nin yeni<br />buluşma noktası."
                </p>
              </div>
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-xl" />
            </div>

            {/* Top-right 1 */}
            <div className="relative overflow-hidden rounded-xl group">
              <img
                src={h1Img}
                alt="Sıcak içecekler"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            {/* Top-right 2 */}
            <div className="relative overflow-hidden rounded-xl group">
              <img
                src={c1Img}
                alt="Kokteyller"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            {/* Bottom-right 1 */}
            <div className="relative overflow-hidden rounded-xl group">
              <img
                src={d1Img}
                alt="Tatlılar"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            {/* Bottom-right 2 */}
            <div className="relative overflow-hidden rounded-xl group">
              <img
                src={g1Img}
                alt="İçecekler"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXPERIENCE
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5 sm:px-8 bg-card/20 border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 sm:gap-24 items-center">
          {/* Text column */}
          <div className="space-y-8 animate-fade-up">
            <div>
              <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-primary/65">
                Fark yaratan detaylar
              </span>
              <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mt-3 leading-[1.05]">
                Eşsiz Bir <br />
                <em className="text-primary">Deneyim</em>
              </h3>
            </div>

            <p className="text-muted-foreground leading-loose text-sm sm:text-[15px] max-w-md">
              Özenle seçilmiş kahve çekirdekleri, el yapımı tatlılar ve imza kokteyllerimizle size
              sadece bir menü değil, unutulmaz bir atmosfer sunuyoruz. Stella Lounge'da her detay,
              kendinizi özel hissetmeniz için tasarlandı.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 pt-2">
              {[
                { icon: Coffee,   title: "Premium Kahve",    desc: "Dünyanın en iyi bölgelerinden özenle seçilmiş çekirdekler." },
                { icon: Wine,     title: "İmza İçecekler",   desc: "Uzman miksologlarımızın ellerinden çıkan eşsiz tatlar." },
                { icon: ChefHat,  title: "Gurme Lezzetler",  desc: "Günlük ve taze hazırlanan özel tatlılar ve atıştırmalıklar." },
                { icon: StarIcon, title: "Lüks Atmosfer",    desc: "Modern ve konforlu tasarımıyla kusursuz bir ortam." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-2.5">
                  <div className="h-9 w-9 rounded-lg border border-primary/20 bg-primary/8 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h4 className="font-sans text-sm font-semibold text-white">{title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors duration-300 group text-[11px] font-bold tracking-[0.3em] uppercase"
            >
              <span>Tüm Menüyü İncele</span>
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Image column */}
          <div
            className="relative h-[380px] sm:h-[500px] animate-fade-up"
            style={{ animationDelay: "0.18s" }}
          >
            {/* Main image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/[0.06]">
              <img
                src={r1Img}
                alt="Stella yemek"
                className="h-full w-full object-cover opacity-85 transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>

            {/* Overlapping small image */}
            <div className="absolute -bottom-5 -right-3 sm:-right-7 w-36 h-36 sm:w-48 sm:h-48 rounded-xl overflow-hidden border-2 border-card shadow-[0_12px_48px_rgba(0,0,0,0.6)]">
              <img
                src={s1Img}
                alt="Stella nargile"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Gold left accent */}
            <div className="absolute top-8 -left-3 w-0.5 h-16 bg-gradient-to-b from-primary to-transparent rounded-full" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LOCATION
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10 sm:mb-14 animate-fade-up">
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-primary/65">
              Neredeyiz
            </span>
            <h3 className="font-display text-4xl sm:text-5xl font-light mt-3">
              Bizi Ziyaret Edin
            </h3>
          </div>

          {/* Info card */}
          <div
            className="relative rounded-2xl border border-white/[0.07] bg-card/70 overflow-hidden animate-fade-up"
            style={{ animationDelay: "0.12s" }}
          >
            {/* Top gold line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06] p-7 sm:p-10">
              {/* Address */}
              <div className="pb-7 sm:pb-0 sm:pr-10 space-y-3">
                <div className="flex items-center gap-2 text-primary mb-5">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="font-sans text-[10px] font-semibold tracking-[0.32em] uppercase">
                    Adres
                  </span>
                </div>
                <p className="text-foreground/75 leading-relaxed text-sm">
                  Kırklareli Merkez,<br />
                  Cumhuriyet Meydanı, No: 1<br />
                  Kırklareli / Türkiye
                </p>
                <a
                  href="https://share.google/3V6S6Y7FJLwnE8zn6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-white transition-colors text-[10px] font-bold tracking-wider uppercase group mt-1"
                >
                  Haritada Gör
                  <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Hours */}
              <div className="pt-7 sm:pt-0 sm:pl-10 space-y-3">
                <div className="flex items-center gap-2 text-primary mb-5">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span className="font-sans text-[10px] font-semibold tracking-[0.32em] uppercase">
                    Çalışma Saatleri
                  </span>
                </div>
                <ul className="text-muted-foreground text-sm space-y-3.5">
                  <li className="flex justify-between items-baseline gap-4">
                    <span>Pazartesi – Perşembe</span>
                    <span className="font-medium text-foreground/70 text-xs tracking-wider font-mono shrink-0">
                      09:00 – 00:00
                    </span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4">
                    <span className="text-white">Cuma – Pazar</span>
                    <span className="font-medium text-primary text-xs tracking-wider font-mono shrink-0">
                      09:00 – 02:00
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom CTA strip */}
            <div className="border-t border-white/[0.06] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <Link
                to="/menu"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-primary text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all duration-300 hover:shadow-[0_0_28px_rgba(212,175,55,0.45)] hover:scale-[1.03]"
              >
                Online Menüyü İncele
              </Link>
              <p className="font-sans text-[9px] font-medium tracking-[0.4em] text-muted-foreground/60 uppercase shrink-0">
                Rezervasyon: +90 555 000 0000
              </p>
            </div>

            {/* Bottom gold line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          {/* ── Google Maps embed ── */}
          <div
            className="mt-4 overflow-hidden rounded-2xl border border-white/[0.07] animate-fade-up"
            style={{ animationDelay: "0.22s", height: "280px" }}
          >
            <iframe
              title="Stella Cafe & Lounge — Harita"
              src="https://www.google.com/maps/embed?pb=!4m5!3m4!1s0x40a753fa146db7eb:0x3e8fcec4cb9a60a5!8m2!3d41.7351!4d27.2201"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(25%) brightness(0.82) contrast(1.1) saturate(0.8)",
                display: "block",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.05] py-10 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Logo mark */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-display text-xl tracking-[0.15em] text-white/70">Stella</span>
            <span className="font-sans text-[8px] tracking-[0.5em] text-primary/55 uppercase -mt-0.5">
              Cafe &amp; Lounge
            </span>
          </div>

          <p className="font-sans text-[9px] tracking-[0.35em] text-muted-foreground/50 uppercase">
            © 2026 Stella Cafe &amp; Lounge. Tüm hakları saklıdır.
          </p>

          {/* Social */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/stella_cafe_lounge/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/50 hover:text-primary transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://share.google/3V6S6Y7FJLwnE8zn6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/50 hover:text-primary transition-colors duration-300"
              aria-label="Haritada Gör"
            >
              <MapPin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
