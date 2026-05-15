import { useLang } from "@/i18n/LanguageContext";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "kn" ? "en" : "kn")}
      className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-sm font-medium text-foreground shadow-soft backdrop-blur transition-smooth hover:border-primary hover:bg-primary hover:text-primary-foreground"
      aria-label="Toggle language"
    >
      <Languages className="h-4 w-4" />
      <span className={lang === "kn" ? "font-display" : ""}>{lang === "kn" ? "ಕನ್ನಡ" : "EN"}</span>
      <span className="text-xs text-muted-foreground transition-smooth group-hover:text-primary-foreground/80">
        / {lang === "kn" ? "EN" : "ಕನ್ನಡ"}
      </span>
    </button>
  );
}