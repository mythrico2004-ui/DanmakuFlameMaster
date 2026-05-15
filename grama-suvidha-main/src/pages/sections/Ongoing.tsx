import { Clock } from "lucide-react";
import { SectionPage } from "@/components/grama/SectionPage";
import { PROJECTS } from "@/data/projects";
import { useLang } from "@/i18n/LanguageContext";

export default function Ongoing() {
  const { t } = useLang();
  return (
    <SectionPage
      icon={Clock}
      title={t("page_ongoing_title")}
      subtitle={t("page_ongoing_sub")}
      projects={PROJECTS.filter((p) => p.status === "in_progress")}
    />
  );
}