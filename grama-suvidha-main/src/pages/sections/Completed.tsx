import { CheckCircle2 } from "lucide-react";
import { SectionPage } from "@/components/grama/SectionPage";
import { PROJECTS } from "@/data/projects";
import { useLang } from "@/i18n/LanguageContext";

export default function Completed() {
  const { t } = useLang();
  return (
    <SectionPage
      icon={CheckCircle2}
      title={t("page_completed_title")}
      subtitle={t("page_completed_sub")}
      projects={PROJECTS.filter((p) => p.status === "completed")}
      accentClass="bg-progress"
    />
  );
}