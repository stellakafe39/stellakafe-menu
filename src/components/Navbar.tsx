import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { Instagram, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

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
          ? "bg-background/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_32px_rgba(0,0,0,0.6)]"
          : "bg-gradient-to-b from-black/55 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* ─── Logo ─── */}
        <Link to="/" className="flex flex-col items-start leading-none group shrink-0">
          <span className="font-display text-[1.45rem] tracking-[0.18em] text-white group-hover:text-primary transition-colors duration-300">
            Stella
          </span>
          <span className="font-sans text-[7px] tracking-[0.55em] text-primary/75 uppercase -mt-0.5">
            Cafe &amp; Lounge
          </span>
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
              href="https://www.instagram.com/stella_cafe_lounge/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-[15px] w-[15px]" />
            </a>
            <a
              href="https://share.google/3V6S6Y7FJLwnE8zn6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Haritada Gör"
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
