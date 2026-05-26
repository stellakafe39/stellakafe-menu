import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "TR" | "BG" | "GR";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  TR: {
    "menu.title": "Menü",
    "menu.subtitle": "Özel lezzetlerimizi keşfedin",
    "home.explore": "Menüyü İncele",
    "home.reservations": "Rezervasyon",
    currency: "TL",
    // Generic
    back: "Geri",
    "prices.info": "Fiyatlar Türk Lirası cinsindendir · Servis ücreti dahildir",
  },
  BG: {
    "menu.title": "Меню",
    "menu.subtitle": "Открийте нашите специални вкусове",
    "home.explore": "Разгледайте менюто",
    "home.reservations": "Резервации",
    currency: "TL",
    back: "Назад",
    "prices.info": "Цените са в турски лири · Обслужването е включено",
  },
  GR: {
    "menu.title": "Μενού",
    "menu.subtitle": "Ανακαλύψτε τις ξεχωριστές γεύσεις μας",
    "home.explore": "Εξερευνήστε το μενού",
    "home.reservations": "Κρατήσεις",
    currency: "TL",
    back: "Πίσω",
    "prices.info": "Οι τιμές είναι σε Τουρκικές Λίρες · Περιλαμβάνεται η εξυπηρέτηση",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("TR");

  const t = (key: string): string => {
    return translations[language][key] || translations["TR"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
