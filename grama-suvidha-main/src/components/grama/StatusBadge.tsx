import { useLang } from "@/i18n/LanguageContext";
import type { ProjectStatus } from "@/data/projects";
import { CheckCircle2, Clock, AlertTriangle, Sprout } from "lucide-react";

const config: Record<ProjectStatus, { cls: string; icon: typeof Clock; key: string }> = {
  planned: { cls: "bg-muted text-muted-foreground border-border", icon: Sprout, key: "status_planned" },
  in_progress: { cls: "bg-accent/20 text-accent-foreground border-accent/40", icon: Clock, key: "status_in_progress" },
  delayed: { cls: "bg-destructive/15 text-destructive border-destructive/30", icon: AlertTriangle, key: "status_delayed" },
  completed: { cls: "bg-success/15 text-success border-success/30", icon: CheckCircle2, key: "status_completed" },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { t } = useLang();
  const c = config[status];
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${c.cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {t(c.key as never)}
    </span>
  );
}