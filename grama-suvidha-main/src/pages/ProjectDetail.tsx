import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "@/components/grama/Header";
import { ProgressBar } from "@/components/grama/ProgressBar";
import { StatusBadge } from "@/components/grama/StatusBadge";
import { StarRating } from "@/components/grama/StarRating";
import { ReportIssueDialog } from "@/components/grama/ReportIssueDialog";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { PROJECTS } from "@/data/projects";
import { ArrowLeft, Calendar, HardHat, IndianRupee, MapPin, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function ProjectDetail() {
  const { id } = useParams();
  const { t, tx, lang } = useLang();
  const project = PROJECTS.find((p) => p.id === id);
  const [userRating, setUserRating] = useState<number>(0);

  useEffect(() => {
    if (project) {
      const stored = localStorage.getItem(`gs_rating_${project.id}`);
      if (stored) setUserRating(Number(stored));
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-24 text-center">
          <p className="text-muted-foreground">Project not found.</p>
          <Link to="/" className="mt-4 inline-block text-primary underline">Back home</Link>
        </div>
      </div>
    );
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "kn" ? "kn-IN" : "en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const utilization = Math.round((project.spentINR / project.budgetINR) * 100);

  const submitRating = (n: number) => {
    setUserRating(n);
    localStorage.setItem(`gs_rating_${project.id}`, String(n));
    toast.success(t("thanks_rating"));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={project.afterImage} alt="" className="h-full w-full object-cover" width={1600} height={900} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        </div>
        <div className="container relative z-10 py-10 md:py-14">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-smooth hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back_list")}
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">{project.code}</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight text-secondary md:text-6xl">
            {tx(project.title)}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">{tx(project.description)}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />{tx(project.ward)}</span>
            <span className="text-border">·</span>
            <span className="inline-flex items-center gap-1.5"><HardHat className="h-4 w-4 text-primary" />{tx(project.contractor)}</span>
          </div>
        </div>
      </section>

      <div className="container grid gap-10 py-10 md:py-14 lg:grid-cols-3">
        {/* MAIN COLUMN */}
        <div className="space-y-10 lg:col-span-2">
          {/* Progress */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-bold text-secondary">{t("progress")}</h2>
              <span className="font-display text-5xl font-black text-primary">{project.progress}%</span>
            </div>
            <div className="mt-4">
              <ProgressBar value={project.progress} showLabel={false} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
              <Stat icon={<Calendar className="h-4 w-4" />} label={lang === "kn" ? "ಆರಂಭ" : "Started"} value={fmt(project.startDate)} />
              <Stat icon={<TrendingUp className="h-4 w-4" />} label={t("expected")} value={fmt(project.expectedCompletion)} />
              <Stat icon={<IndianRupee className="h-4 w-4" />} label={t("utilization")} value={`${utilization}%`} />
            </div>
          </div>

          {/* Before / After */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-secondary">
              {t("before")} → {t("after")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Figure label={t("before")} src={project.beforeImage} muted />
              <Figure label={t("after")} src={project.afterImage} />
            </div>
          </div>

          {/* Updates timeline */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-secondary">{t("updates")}</h2>
            <ol className="relative space-y-4 border-l-2 border-dashed border-primary/30 pl-6">
              {project.updates.map((u, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{fmt(u.date)}</p>
                  <p className="mt-0.5 font-display text-lg font-semibold text-foreground">{tx(u.title)}</p>
                  {u.note && <p className="mt-1 text-sm text-muted-foreground">{tx(u.note)}</p>}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          {/* Budget */}
          <div className="bg-hero relative overflow-hidden rounded-2xl p-6 text-primary-foreground shadow-elevated">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/80">{t("budget")}</p>
            <p className="mt-1 font-display text-4xl font-black">
              ₹{(project.budgetINR / 100000).toFixed(2)}L
            </p>
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-primary-foreground/20">
              <div className="h-full rounded-full bg-primary-foreground" style={{ width: `${utilization}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs">
              <span>{t("spent")} ₹{(project.spentINR / 100000).toFixed(2)}L</span>
              <span>{utilization}%</span>
            </div>
          </div>

          {/* Rate */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold text-secondary">{t("rate_work")}</h3>
            <div className="mt-3 flex items-center gap-3">
              <StarRating value={userRating} onChange={submitRating} size="lg" />
              {userRating > 0 && (
                <span className="font-mono text-sm text-muted-foreground">{userRating}/5</span>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{lang === "kn" ? "ಸಮುದಾಯ ಸರಾಸರಿ" : "Community average"}</span>
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <StarRating value={project.rating} readOnly size="sm" />
                {project.rating.toFixed(1)} ({project.ratingCount})
              </span>
            </div>
          </div>

          <ReportIssueDialog
            projectTitle={tx(project.title)}
            trigger={
              <Button variant="outline" className="w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground">
                {t("cta_report")}
              </Button>
            }
          />
        </aside>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-3">
      <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 font-display text-base font-bold text-foreground">{value}</p>
    </div>
  );
}

function Figure({ label, src, muted }: { label: string; src: string; muted?: boolean }) {
  return (
    <figure className={`group relative overflow-hidden rounded-2xl border ${muted ? "border-border" : "border-primary/40"} shadow-soft`}>
      <img src={src} alt={label} loading="lazy" width={1024} height={768} className={`aspect-[4/3] w-full object-cover transition-smooth duration-500 group-hover:scale-105 ${muted ? "grayscale-[0.3]" : ""}`} />
      <figcaption className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary backdrop-blur">
        {label}
      </figcaption>
    </figure>
  );
}