import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/grama/ProjectCard";
import { ArrowRight, CheckCircle2, Clock, AlertTriangle, Star, IndianRupee, Users } from "lucide-react";

export default function Overview() {
  const { t, lang } = useLang();

  const counts = {
    ongoing: PROJECTS.filter((p) => p.status === "in_progress").length,
    pending: PROJECTS.filter((p) => p.status === "planned" || p.status === "delayed").length,
    completed: PROJECTS.filter((p) => p.status === "completed").length,
  };
  const totalBudget = PROJECTS.reduce((s, p) => s + p.budgetINR, 0);
  const citizens = PROJECTS.reduce((s, p) => s + p.ratingCount, 0);
  const featured = [...PROJECTS].sort((a, b) => b.progress - a.progress).slice(0, 3);

  const navTiles = [
    { url: "/app/ongoing", icon: Clock, label: t("nav_ongoing"), count: counts.ongoing, color: "bg-accent text-accent-foreground" },
    { url: "/app/pending", icon: AlertTriangle, label: t("nav_pending"), count: counts.pending, color: "bg-destructive text-destructive-foreground" },
    { url: "/app/completed", icon: CheckCircle2, label: t("nav_completed"), count: counts.completed, color: "bg-progress text-primary-foreground" },
    { url: "/app/ratings", icon: Star, label: t("nav_ratings"), count: PROJECTS.length, color: "bg-hero text-primary-foreground" },
  ];

  return (
    <div className="container py-8 md:py-12">
      {/* Greeting */}
      <div className="animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{t("nav_overview")}</p>
        <h1 className="mt-2 font-display text-4xl font-black leading-tight text-secondary md:text-5xl">
          {lang === "kn" ? "ನಮಸ್ಕಾರ, ನಾಗರಿಕರೇ 🙏" : "Welcome, citizen 🙏"}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("hero_sub")}</p>
      </div>

      {/* Quick stats */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label={t("stat_projects")} value={String(PROJECTS.length)} accent />
        <Stat label={t("stat_completed")} value={String(counts.completed)} />
        <Stat label={t("stat_budget")} value={`₹${(totalBudget / 100000).toFixed(1)}L`} icon={<IndianRupee className="h-4 w-4" />} />
        <Stat label={t("stat_citizens")} value={citizens.toLocaleString(lang === "kn" ? "kn-IN" : "en-IN")} icon={<Users className="h-4 w-4" />} />
      </div>

      {/* Section nav tiles */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {navTiles.map((tile, i) => (
          <Link
            key={tile.url}
            to={tile.url}
            className="group animate-fade-up relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl shadow-soft ${tile.color}`}>
              <tile.icon className="h-5 w-5" />
            </div>
            <p className="font-display text-3xl font-black text-secondary">{tile.count}</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{tile.label}</p>
            <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-smooth group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        ))}
      </div>

      {/* Featured */}
      <div className="mt-14">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold text-secondary md:text-3xl">
            {lang === "kn" ? "ಗಮನಾರ್ಹ ಯೋಜನೆಗಳು" : "Featured Projects"}
          </h2>
          <Link to="/app/ongoing" className="text-sm font-semibold text-primary hover:underline">
            {t("nav_ongoing")} →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-4 shadow-soft transition-smooth hover:shadow-elevated ${
        accent ? "bg-hero border-transparent text-primary-foreground" : "border-border bg-card"
      }`}
    >
      <p className={`text-[11px] uppercase tracking-wider ${accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
        {label}
      </p>
      <p className="mt-1 flex items-center gap-1.5 font-display text-2xl font-bold">
        {icon}
        {value}
      </p>
    </div>
  );
}