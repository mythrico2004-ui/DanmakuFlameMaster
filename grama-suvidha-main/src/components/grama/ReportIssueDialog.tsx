import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useLang } from "@/i18n/LanguageContext";
import { toast } from "sonner";
import { Flag } from "lucide-react";

interface Props {
  trigger?: React.ReactNode;
  projectTitle?: string;
}

export function ReportIssueDialog({ trigger, projectTitle }: Props) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!message.trim()) return;
    // Persist locally so it survives offline
    const reports = JSON.parse(localStorage.getItem("gs_reports") || "[]");
    reports.push({ name, message, projectTitle, at: new Date().toISOString() });
    localStorage.setItem("gs_reports", JSON.stringify(reports));
    toast.success(t("report_sent"));
    setMessage("");
    setName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="gap-2">
            <Flag className="h-4 w-4" />
            {t("cta_report")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{t("report_title")}</DialogTitle>
          <DialogDescription>
            {t("report_desc")}
            {projectTitle && <span className="mt-1 block font-medium text-foreground">— {projectTitle}</span>}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder={lang === "kn" ? "ನಿಮ್ಮ ಹೆಸರು (ಐಚ್ಛಿಕ)" : "Your name (optional)"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder={t("your_message")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          />
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={submit} className="bg-primary hover:bg-primary/90">
            {t("submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}