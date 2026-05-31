import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
const HERO_POSTER = "/hero-poster.webp";
import c1Img from "@/assets/c1.jpg";
import d1Img from "@/assets/d1.jpg";
import g1Img from "@/assets/g1.jpg";
import h1Img from "@/assets/h1.jpg";
import r1Img from "@/assets/r1.jpg";
import { ArrowRightIcon, StarIcon } from "@/components/Icons";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { MapPin, Clock, Coffee, Wine, ChefHat, Instagram } from "lucide-react";

const MAPS_URL = "https://www.google.com/maps/place/STELLA+CAFE+LOUNGE/@41.7345705,27.2216154,17z/data=!3m1!4b1!4m16!1m9!4m8!1m0!1m6!1m2!1s0x40a753fa146db7eb:0x3e8fcec4cb9a60a5!2sSTELLA+CAFE+LOUNGE,+Karacaibrahim,+Dere+%C3%9Cst%C3%BC+Sk.+No:8,+39000+K%C4%B1rklareli+Merkez%2FK%C4%B1rklareli!2m2!1d27.2241893!2d41.734568!3m5!1s0x40a753fa146db7eb:0x3e8fcec4cb9a60a5!8m2!3d41.7345665!4d27.2241903!16s%2Fg%2F11z1x8wt4z";
const INSTAGRAM_URL = "https://www.instagram.com/stella_cafe_lounge/";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Stella Cafe & Lounge — Kırklareli" },
      {
        name: "description",
        content:
          "Kırklareli Merkez'de eşsiz cafe ve lounge deneyimi. Premium kahve, imza içecekler, gurme lezzetler ve lüks atmosfer. Online menüyü inceleyin.",
      },
      { property: "og:title", content: "Stella Cafe & Lounge — Kırklareli" },
      { property: "og:description", content: "Kırklareli'nin en seçkin cafe ve lounge deneyimi." },
      { property: "og:url", content: "https://stellalounge39.vercel.app/" },
    ],
    links: [
      { rel: "preload", as: "image", href: "/hero-poster.webp" },
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
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={HERO_POSTER}
            className="h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            <img src={heroImg} alt="Stella Cafe & Lounge iç mekan" className="h-full w-full object-cover" fetchPriority="high" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
        </div>

        {/* Grain */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
            opacity: 0.03,
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
          <div className="flex items-center gap-4 mb-6 animate-fade-up" style={{ animationDelay: "0.08s" }}>
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-primary font-semibold">
              Kırklareli Merkez
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/60" />
          </div>

          {/* Logo image in hero */}
          <div className="mb-4 animate-fade-up" style={{ animationDelay: "0.14s" }}>
            <img
              src="/stella-logo.png"
              alt="Stella Cafe & Lounge"
              className="h-16 sm:h-20 w-auto object-contain mx-auto opacity-90"
              width={200}
              height={80}
              loading="eager"
              decoding="async"
            />
          </div>

          <h1
            className="font-display font-light tracking-[0.05em] text-white leading-[0.9] animate-fade-up sr-only"
            style={{ animationDelay: "0.2s" }}
          >
            Stella Cafe &amp; Lounge
          </h1>

          <div className="mt-3 flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="h-px w-8 bg-primary/35" />
            <h2 className="font-sans text-[10px] sm:text-xs tracking-[0.6em] uppercase text-primary font-medium">
              Cafe &amp; Lounge
            </h2>
            <div className="h-px w-8 bg-primary/35" />
          </div>

          <p
            className="mt-10 max-w-xs sm:max-w-sm font-sans text-sm text-white/55 leading-relaxed tracking-wide animate-fade-up"
            style={{ animationDelay: "0.46s" }}
          >
            {t("menu.subtitle") ||
              "Kırklareli'nin en seçkin noktasında, eşsiz tatlar ve kusursuz bir atmosfer."}
          </p>

          <Link
            to="/menu"
            preload="intent"
            className="mt-12 group relative inline-flex items-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
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
          style={{ animationDelay: "0.85s" }}
        >
          <span className="font-sans text-[8px] tracking-[0.45em] text-white/30 uppercase">Keşfet</span>
          <div className="animate-scroll-bounce">
            <div className="w-px h-9 bg-gradient-to-b from-primary/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════════ */}
      <div className="border-y border-border/20 bg-card/40 py-4 overflow-hidden">
        <div className="animate-marquee flex items-center gap-0 whitespace-nowrap" style={{ width: "max-content" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-sans text-[9px] tracking-[0.4em] uppercase text-primary/50 pr-14">
              Premium Kahve · İmza İçecekler · Gurme Lezzetler · Lüks Atmosfer · Kırklareli
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14 flex flex-col items-center text-center animate-fade-up">
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-primary/65 mb-3">Atmosfer</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground font-light leading-tight">
              Bir Dünya <em>Yaratıyoruz</em>
            </h2>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 h-[380px] sm:h-[540px] animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="col-span-2 row-span-2 relative overflow-hidden rounded-xl group">
              <img
                src={heroImg}
                alt="Stella Cafe & Lounge atmosfer"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-display text-xl sm:text-2xl text-white italic font-light leading-snug">
                  "Kırklareli'nin yeni<br />buluşma noktası."
                </p>
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-xl" />
            </div>

            {[
              { src: h1Img, alt: "Sıcak içecekler" },
              { src: c1Img, alt: "Kokteyller" },
              { src: d1Img, alt: "Tatlılar" },
              { src: g1Img, alt: "İçecekler" },
            ].map(({ src, alt }) => (
              <div key={alt} className="relative overflow-hidden rounded-xl group">
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXPERIENCE
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5 sm:px-8 bg-card/20 border-y border-border/20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 sm:gap-24 items-center">
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

            <div className="grid grid-cols-2 gap-x-6 gap-y-7 pt-2">
              {[
                { icon: Coffee,   title: "Premium Kahve",   desc: "Dünyanın en iyi bölgelerinden özenle seçilmiş çekirdekler.", slug: "premium-kahve" },
                { icon: Wine,     title: "İmza İçecekler",  desc: "Uzman miksologlarımızın ellerinden çıkan eşsiz tatlar.", slug: "imza-icecekler" },
                { icon: ChefHat,  title: "Gurme Lezzetler", desc: "Günlük taze hazırlanan özel tatlılar ve atıştırmalıklar.", slug: "gurme-lezzetler" },
                { icon: StarIcon, title: "Lüks Atmosfer",   desc: "Modern ve konforlu tasarımıyla kusursuz bir ortam.", slug: "luks-atmosfer" },
              ].map(({ icon: Icon, title, desc, slug }) => (
                <Link
                  key={title}
                  to="/hizmetler/$slug"
                  params={{ slug }}
                  className="flex flex-col gap-2.5 group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="h-9 w-9 rounded-lg border border-primary/20 bg-primary/8 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                    <Icon className="h-4 w-4 text-primary group-hover:text-black transition-colors" />
                  </div>
                  <h4 className="font-sans text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>

            <Link
              to="/menu"
              preload="intent"
              className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors duration-300 group text-[11px] font-bold tracking-[0.3em] uppercase"
            >
              <span>Tüm Menüyü İncele</span>
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative h-[380px] sm:h-[500px] animate-fade-up" style={{ animationDelay: "0.18s" }}>
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border/25">
              <img
                src={r1Img}
                alt="Stella yemek ve içecek"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-85 transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-3 sm:-right-7 w-36 h-36 sm:w-48 sm:h-48 rounded-xl overflow-hidden border-2 border-card shadow-[0_12px_48px_rgba(0,0,0,0.6)] animate-float">
              <img src={d1Img} alt="Stella tatlı" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="absolute top-8 -left-3 w-0.5 h-16 bg-gradient-to-b from-primary to-transparent rounded-full" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LOCATION
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 animate-fade-up">
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-primary/65">Neredeyiz</span>
            <h3 className="font-display text-4xl sm:text-5xl font-light mt-3">Bizi Ziyaret Edin</h3>
          </div>

          <div
            className="relative rounded-2xl border border-border/30 bg-card/70 overflow-hidden animate-fade-up"
            style={{ animationDelay: "0.12s" }}
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/30 p-7 sm:p-10">
              <div className="pb-7 sm:pb-0 sm:pr-10 space-y-3">
                <div className="flex items-center gap-2 text-primary mb-5">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="font-sans text-[10px] font-semibold tracking-[0.32em] uppercase">Adres</span>
                </div>
                <address className="text-foreground/75 leading-relaxed text-sm not-italic">
                  Karacaibrahim Mah.,<br />
                  Dere Üstü Sk. No: 8<br />
                  Kırklareli Merkez / Türkiye
                </address>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-foreground transition-colors text-[10px] font-bold tracking-wider uppercase group mt-1"
                >
                  Haritada Gör
                  <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              <div className="pt-7 sm:pt-0 sm:pl-10 space-y-3">
                <div className="flex items-center gap-2 text-primary mb-5">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span className="font-sans text-[10px] font-semibold tracking-[0.32em] uppercase">Çalışma Saatleri</span>
                </div>
                <ul className="text-muted-foreground text-sm space-y-3.5">
                  <li className="flex justify-between items-baseline gap-4">
                    <span>Pazartesi – Perşembe</span>
                    <span className="font-medium text-foreground/70 text-xs tracking-wider font-mono shrink-0">09:00 – 00:00</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4">
                    <span className="text-foreground">Cuma – Pazar</span>
                    <span className="font-medium text-primary text-xs tracking-wider font-mono shrink-0">09:00 – 02:00</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border/25 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <Link
                to="/menu"
                preload="intent"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-primary text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all duration-300 hover:shadow-[0_0_28px_rgba(212,175,55,0.45)] hover:scale-[1.03]"
              >
                Online Menüyü İncele
              </Link>
              <p className="font-sans text-[9px] font-medium tracking-[0.4em] text-muted-foreground/60 uppercase shrink-0">
                Rezervasyon: +90 555 000 0000
              </p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          <div
            className="mt-4 overflow-hidden rounded-2xl border border-border/25 animate-fade-up"
            style={{ animationDelay: "0.22s", height: "280px" }}
          >
            <iframe
              title="Stella Cafe & Lounge — Konum"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.254!2d27.2219853!3d41.7345665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a753fa146db7eb%3A0x3e8fcec4cb9a60a5!2sSTELLA%20CAFE%20LOUNGE!5e0!3m2!1str!2str!4v1748649600000!5m2!1str!2str"
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

      <Footer />
    </main>
  );
}
