import { useLanguage } from "@/lib/i18n";
import { Instagram, MapPin } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-full bg-card/80 px-4 py-2 backdrop-blur-md border border-border shadow-sm">
      <div className="flex items-center gap-2 pr-3 border-r border-border/50">
        {(["TR", "BG", "GR"] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`text-xs font-bold transition-colors ${
              language === lang ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a href="https://www.instagram.com/stella_cafe_lounge/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Instagram className="h-4 w-4" />
        </a>
        <a href="https://share.google/3V6S6Y7FJLwnE8zn6" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <MapPin className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
