import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/data/projects";
import { useLang } from "@/i18n/LanguageContext";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  projects: Project[];
  accentClass?: string;
}

export function SectionPage({ icon: Icon, title, subtitle, projects, accentClass = "bg-hero" }: Props) {
  const { t } = useLang();
  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-start gap-4">
        <div className={`${accentClass} flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-primary-foreground shadow-elevated`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{projects.length} {projects.length === 1 ? "work" : "works"}</p>
          <h1 className="font-display text-3xl font-black text-secondary md:text-5xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{subtitle}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-16 text-center text-muted-foreground">
          {t("no_works")}
        </div>
      )}
    </div>
  );
}