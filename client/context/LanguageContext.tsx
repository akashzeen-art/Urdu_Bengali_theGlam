import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Language } from "@/data/translations";

const STORAGE_KEY = "TheGlam_language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)[Language];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "english" || stored === "bangla") return stored;
  if (stored === "urdu") {
    localStorage.setItem(STORAGE_KEY, "bangla");
    return "bangla";
  }
  localStorage.setItem(STORAGE_KEY, "bangla");
  return "bangla";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  useEffect(() => {
    document.documentElement.lang = language === "bangla" ? "bn" : "en";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
