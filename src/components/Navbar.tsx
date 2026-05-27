import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { Instagram, MapPin, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const MAPS_URL =
  "https://www.google.com/maps/place/Stella+Cafe+%26+Lounge/@41.7351,27.2201,17z";
const INSTAGRAM_URL = "https://www.instagram.com/stella_cafe_lounge/";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isLight ? "Karanlık moda geç" : "Aydınlık moda geç"}
      title={isLight ? "Karanlık mod" : "Aydınlık mod"}
      className={`relative flex items-center h-6 w-11 rounded-full border transition-all duration-500 shrink-0 ${
        isLight
          ? "border-amber-300/70 bg-amber-50/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)]"
          : "border-white/10 bg-white/[0.07] shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]"
      }`}
    >
      {/* Moon icon — visible in dark mode side */}
      <Moon
        className={`absolute left-1.5 h-2.5 w-2.5 transition-all duration-400 ${
          isLight ? "opacity-0 scale-50" : "opacity-50 scale-100 text-white/70"
        }`}
      />
      {/* Sun icon — visible in light mode side */}
      <Sun
        className={`absolute right-1.5 h-2.5 w-2.5 transition-all duration-400 ${
          isLight ? "opacity-70 scale-100 text-amber-600" : "opacity-0 scale-50"
        }`}
      />
      {/* Sliding knob */}
      <span
        className={`absolute h-4 w-4 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isLight
            ? "left-[calc(100%-18px)] bg-amber-400 shadow-[0_0_8px_rgba(212,175,55,0.5),0_1px_3px_rgba(0,0,0,0.2)]"
            : "left-[2px] bg-[#2c2c2c] shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
        }`}
      />
    </button>
  );
}

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = scrolled || isLight
    ? isLight
      ? "bg-background/95 backdrop-blur-2xl border-b border-black/[0.07] shadow-[0_1px_24px_rgba(0,0,0,0.07)]"
      : "bg-background/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_32px_rgba(0,0,0,0.6)]"
    : "bg-gradient-to-b from-black/55 to-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">

        {/* ─── Logo ─── */}
        <Link to="/" preload="intent" className="shrink-0 group" aria-label="Stella Cafe & Lounge — Ana Sayfa">
          <img
            src="/stella-logo.png"
            alt="Stella Cafe & Lounge"
            className={`h-14 w-auto object-contain transition-opacity duration-300 ${
              isLight ? "opacity-85 group-hover:opacity-100" : "opacity-90 group-hover:opacity-100"
            }`}
            width="192"
            height="56"
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
        <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">

          {/* Language — desktop only */}
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

          {/* Language — mobile only */}
          <div className="flex sm:hidden items-center gap-0.5">
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

          {/* Theme switcher — always visible, single instance */}
          <ThemeSwitcher />

          <div className="hidden sm:block w-px h-3.5 bg-border/60" />

          {/* Social icons — desktop only */}
          <div className="hidden sm:flex items-center gap-3">
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
        </div>
      </div>
    </nav>
  );
}
