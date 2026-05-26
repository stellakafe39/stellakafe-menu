import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { Instagram, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const MAPS_URL =
  "https://www.google.com/maps/place/Stella+Cafe+%26+Lounge/@41.7351,27.2201,17z";
const INSTAGRAM_URL = "https://www.instagram.com/stella_cafe_lounge/";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/88 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_32px_rgba(0,0,0,0.6)]"
          : "bg-gradient-to-b from-black/55 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* ─── Logo ─── */}
        <Link to="/" preload="intent" className="shrink-0 group" aria-label="Stella Cafe & Lounge — Ana Sayfa">
          <img
            src="/stella-logo.png"
            alt="Stella Cafe & Lounge"
            className="h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            width="160"
            height="48"
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* ─── Center nav (desktop) ─── */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/"
            preload="intent"
            className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 px-3 py-1"
          >
            Ana Sayfa
          </Link>
          <span className="text-border text-xs">·</span>
          <Link
            to="/menu"
            preload="intent"
            className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 px-3 py-1"
          >
            Menü
          </Link>
        </div>

        {/* ─── Right controls ─── */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Language — desktop */}
          <div className="hidden sm:flex items-center gap-1.5">
            {(["TR", "BG", "GR"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`font-sans text-[10px] font-bold tracking-wider transition-all duration-200 px-1 py-0.5 rounded ${
                  language === lang
                    ? "text-primary"
                    : "text-muted-foreground/60 hover:text-muted-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-px h-3.5 bg-border/60" />

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-[15px] w-[15px]" />
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Google Maps'te Gör"
            >
              <MapPin className="h-[15px] w-[15px]" />
            </a>
          </div>

          {/* Language — mobile */}
          <div className="flex sm:hidden items-center gap-0.5 ml-1">
            {(["TR", "BG", "GR"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-[9px] font-bold tracking-wider transition-all px-1 py-0.5 ${
                  language === lang ? "text-primary" : "text-muted-foreground/50"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
