import { AlertTriangle } from "lucide-react";
import { SectionPage } from "@/components/grama/SectionPage";
import { PROJECTS } from "@/data/projects";
import { useLang } from "@/i18n/LanguageContext";

export default function Pending() {
  const { t } = useLang();
  return (
    <SectionPage
      icon={AlertTriangle}
      title={t("page_pending_title")}
      subtitle={t("page_pending_sub")}
      projects={PROJECTS.filter((p) => p.status === "planned" || p.status === "delayed")}
      accentClass="bg-destructive"
    />
  );
}