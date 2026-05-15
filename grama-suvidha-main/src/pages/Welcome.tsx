import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { LanguageToggle } from "@/components/grama/LanguageToggle";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-village.jpg";
import { ArrowRight, IndianRupee, Sparkles, Sprout, TrendingUp, Users } from "lucide-react";

export default function Welcome() {
  const { t, lang } = useLang();

  const features = [
    { icon: TrendingUp, t: t("feat_1_t"), d: t("feat_1_d") },
    { icon: IndianRupee, t: t("feat_2_t"), d: t("feat_2_d") },
    { icon: Users, t: t("feat_3_t"), d: t("feat_3_d") },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background art */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="" width={1920} height={1080} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 paper-grain" />
      </div>

      {/* Top bar */}
      <header className="relative z-10">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-hero flex h-11 w-11 items-center justify-center rounded-xl shadow-soft">
              <Sprout className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-bold text-secondary">{t("app_name")}</p>
              <p className="text-[11px] text-muted-foreground">{t("tagline")}</p>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Hero */}
      <main className="container relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-16 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/70 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          {t("welcome_kicker")}
        </div>

        <h1
          className="animate-fade-up mt-6 max-w-4xl font-display text-5xl font-black leading-[1.05] tracking-tight text-secondary md:text-7xl lg:text-[5.5rem]"
          style={{ animationDelay: "100ms" }}
        >
          {t("welcome_title")}
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-2xl text-base text-foreground/80 md:text-lg"
          style={{ animationDelay: "200ms" }}
        >
          {t("welcome_sub")}
        </p>

        <div className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "300ms" }}>
          <Button asChild size="lg" className="bg-primary text-primary-foreground shadow-elevated transition-smooth hover:bg-primary/90 hover:shadow-glow">
            <Link to="/app">
              {t("enter_app")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Feature trio */}
        <div className="animate-fade-up mt-20 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3" style={{ animationDelay: "400ms" }}>
          {features.map((f) => (
            <div
              key={f.t}
              className="group rounded-2xl border border-border bg-card/80 p-5 text-left shadow-soft backdrop-blur transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
            >
              <div className="bg-hero mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground shadow-soft transition-smooth group-hover:rotate-6">
                <f.icon className="h-5 w-5" />
              </div>
              <p className="font-display text-lg font-bold text-secondary">{f.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {lang === "kn" ? "ಗ್ರಾಮ ಸ್ವರಾಜ್ • ಪಾರದರ್ಶಕತೆ" : "Grama Swaraj • Transparency"}
        </p>
      </main>
    </div>
  );
}