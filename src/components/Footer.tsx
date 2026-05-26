import { Link } from "@tanstack/react-router";
import { Instagram, MapPin } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps/place/Stella+Cafe+%26+Lounge/@41.7351,27.2201,17z";
const INSTAGRAM_URL = "https://www.instagram.com/stella_cafe_lounge/";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-10 px-5 sm:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-40 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start">
          <Link to="/" aria-label="Stella Cafe & Lounge — Ana Sayfa">
            <img
              src="/stella-logo.png"
              alt="Stella Cafe & Lounge"
              className="h-10 w-auto object-contain opacity-60 hover:opacity-90 transition-opacity duration-500"
              width={120}
              height={40}
              loading="lazy"
              decoding="async"
            />
          </Link>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <p className="font-sans text-[9px] tracking-[0.35em] text-muted-foreground/50 uppercase">
            © 2026 Stella Cafe &amp; Lounge · Tüm Hakları Saklıdır
          </p>
          <p className="font-sans text-[9px] tracking-[0.2em] text-muted-foreground/35 uppercase">
            Powered by{" "}
            <a
              href="https://digimerca.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/55 hover:text-primary transition-colors duration-300 font-bold"
            >
              DIGIMERCA
            </a>
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/50 hover:text-primary transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/50 hover:text-primary transition-colors duration-300"
            aria-label="Google Maps'te Gör"
          >
            <MapPin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
