import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";
import { StarRating } from "./StarRating";
import type { Project } from "@/data/projects";
import { ArrowUpRight, MapPin } from "lucide-react";

const CAT_KEY: Record<Project["category"], string> = {
  road: "cat_road",
  water: "cat_water",
  civic: "cat_civic",
  education: "cat_education",
  energy: "cat_energy",
};

function formatINR(n: number, lang: "kn" | "en") {
  // Lakhs format
  const lakhs = n / 100000;
  const num = lakhs >= 100 ? `${(lakhs / 100).toFixed(2)} Cr` : `${lakhs.toFixed(2)} L`;
  return lang === "kn" ? `₹${num}` : `₹${num}`;
}

export function ProjectCard({ project }: { project: Project }) {
  const { lang, t, tx } = useLang();

  return (
    <Link
      to={`/project/${project.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.afterImage}
          alt={tx(project.title)}
          loading="lazy"
          width={1024}
          height={640}
          className="h-full w-full object-cover transition-smooth duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="rounded-full bg-background/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary backdrop-blur">
            {t(CAT_KEY[project.category] as never)}
          </span>
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-foreground/40 p-2 text-background opacity-0 backdrop-blur transition-smooth group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-background">
          <p className="font-mono text-[10px] uppercase tracking-widest text-background/80">{project.code}</p>
          <h3 className="font-display text-xl font-bold leading-tight md:text-2xl">{tx(project.title)}</h3>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {tx(project.ward)}
        </div>
        <ProgressBar value={project.progress} showLabel={false} />
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("budget")}</p>
            <p className="font-display text-lg font-bold text-secondary">{formatINR(project.budgetINR, lang)}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5">
              <StarRating value={project.rating} readOnly size="sm" />
              <span className="font-mono text-sm font-semibold text-foreground">{project.rating.toFixed(1)}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">{project.ratingCount} {t("ratings")}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}