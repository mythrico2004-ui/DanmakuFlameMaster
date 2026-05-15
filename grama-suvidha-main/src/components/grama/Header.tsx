import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { Sprout } from "lucide-react";

export function Header() {
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <div className="bg-hero relative flex h-10 w-10 items-center justify-center rounded-xl shadow-soft transition-smooth group-hover:rotate-6 group-hover:shadow-glow">
            <Sprout className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg font-bold text-secondary">{t("app_name")}</p>
            <p className="hidden text-[11px] text-muted-foreground sm:block">{t("tagline")}</p>
          </div>
        </Link>
        <LanguageToggle />
      </div>
    </header>
  );
}