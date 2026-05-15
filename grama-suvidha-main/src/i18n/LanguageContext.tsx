import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "kn" | "en";

type Dict = Record<string, { kn: string; en: string }>;

const DICT: Dict = {
  app_name: { kn: "ಗ್ರಾಮ-ಸುವಿಧಾ", en: "Grama-Suvidha" },
  tagline: { kn: "ನಿಮ್ಮ ಊರಿನ ಪಾರದರ್ಶಕ ಡಿಜಿಟಲ್ ಸೂಚನಾ ಫಲಕ", en: "Your village's transparent digital notice board" },
  hero_title: { kn: "ಪ್ರತಿ ಕಾಮಗಾರಿ. ಪ್ರತಿ ರೂಪಾಯಿ. ಎಲ್ಲರಿಗೂ ಗೋಚರ.", en: "Every project. Every rupee. Visible to everyone." },
  hero_sub: { kn: "ಪಂಚಾಯಿತಿಯ ಎಲ್ಲಾ ಯೋಜನೆಗಳ ಪ್ರಗತಿಯನ್ನು ನೈಜ ಸಮಯದಲ್ಲಿ ನೋಡಿ — ಬಜೆಟ್, ಸ್ಥಿತಿ ಮತ್ತು ಪೂರ್ಣಗೊಳಿಸುವ ದಿನಾಂಕ ಸಹಿತ.", en: "Track every Panchayat project in real time — with budget, status and completion dates. Rate works and report issues directly." },
  cta_view: { kn: "ಯೋಜನೆಗಳನ್ನು ನೋಡಿ", en: "View Projects" },
  cta_report: { kn: "ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ", en: "Report Issue" },
  ongoing_works: { kn: "ನಡೆಯುತ್ತಿರುವ ಕಾಮಗಾರಿಗಳು", en: "Ongoing works" },
  all: { kn: "ಎಲ್ಲಾ", en: "All" },
  filter_status: { kn: "ಸ್ಥಿತಿ", en: "Status" },
  search_placeholder: { kn: "ಯೋಜನೆ ಹುಡುಕಿ…", en: "Search projects…" },
  status_planned: { kn: "ಯೋಜಿತ", en: "Planned" },
  status_in_progress: { kn: "ಪ್ರಗತಿಯಲ್ಲಿ", en: "In Progress" },
  status_delayed: { kn: "ವಿಳಂಬ", en: "Delayed" },
  status_completed: { kn: "ಪೂರ್ಣಗೊಂಡಿದೆ", en: "Completed" },
  cat_road: { kn: "ರಸ್ತೆ", en: "Road" },
  cat_water: { kn: "ನೀರು", en: "Water" },
  cat_civic: { kn: "ನಾಗರಿಕ", en: "Civic" },
  cat_education: { kn: "ಶಿಕ್ಷಣ", en: "Education" },
  cat_energy: { kn: "ಶಕ್ತಿ", en: "Energy" },
  budget: { kn: "ಬಜೆಟ್", en: "Budget" },
  spent: { kn: "ಖರ್ಚಾಗಿದೆ", en: "Spent" },
  expected: { kn: "ನಿರೀಕ್ಷಿತ ಮುಕ್ತಾಯ", en: "Expected completion" },
  contractor: { kn: "ಗುತ್ತಿಗೆದಾರ", en: "Contractor" },
  ward: { kn: "ವಾರ್ಡ್", en: "Ward" },
  before: { kn: "ಮೊದಲು", en: "Before" },
  after: { kn: "ನಂತರ", en: "After" },
  progress: { kn: "ಪ್ರಗತಿ", en: "Progress" },
  updates: { kn: "ನವೀಕರಣಗಳು", en: "Status updates" },
  rate_work: { kn: "ಈ ಕಾಮಗಾರಿಯನ್ನು ರೇಟ್ ಮಾಡಿ", en: "Rate this work" },
  thanks_rating: { kn: "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಧ್ವನಿ ದಾಖಲಾಗಿದೆ.", en: "Thank you! Your voice is recorded." },
  back_list: { kn: "ಎಲ್ಲಾ ಯೋಜನೆಗಳಿಗೆ", en: "Back to all projects" },
  report_title: { kn: "ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ", en: "Report an issue" },
  report_desc: { kn: "ಗುಣಮಟ್ಟ, ವಿಳಂಬ ಅಥವಾ ಯಾವುದೇ ಸಮಸ್ಯೆಯ ಬಗ್ಗೆ ತಿಳಿಸಿ.", en: "Tell us about quality, delay or any concern." },
  your_message: { kn: "ನಿಮ್ಮ ಸಂದೇಶ", en: "Your message" },
  submit: { kn: "ಸಲ್ಲಿಸಿ", en: "Submit" },
  cancel: { kn: "ರದ್ದು", en: "Cancel" },
  report_sent: { kn: "ವರದಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ಪಂಚಾಯಿತಿಗೆ ತಲುಪಿಸಲಾಗುವುದು.", en: "Report received. It will reach the Panchayat office." },
  stat_projects: { kn: "ಸಕ್ರಿಯ ಯೋಜನೆಗಳು", en: "Active projects" },
  stat_budget: { kn: "ಒಟ್ಟು ಬಜೆಟ್", en: "Total budget" },
  stat_completed: { kn: "ಪೂರ್ಣಗೊಂಡ ಕಾಮಗಾರಿಗಳು", en: "Completed works" },
  stat_citizens: { kn: "ತೊಡಗಿಸಿಕೊಂಡ ನಾಗರಿಕರು", en: "Engaged citizens" },
  offline_note: { kn: "ಆಫ್‌ಲೈನ್ ನೋಟಕ್ಕಾಗಿ ಡೇಟಾ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ", en: "Cached for offline viewing" },
  footer_note: { kn: "ಪಾರದರ್ಶಕತೆಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ • ಗ್ರಾಮ ಸ್ವರಾಜ್", en: "Built for transparency • Grama Swaraj" },
  utilization: { kn: "ಬಳಕೆ", en: "Utilisation" },
  ratings: { kn: "ರೇಟಿಂಗ್‌ಗಳು", en: "ratings" },

  /* Welcome */
  welcome_kicker: { kn: "ಸುಸ್ವಾಗತ", en: "Welcome" },
  welcome_title: { kn: "ನಿಮ್ಮ ಗ್ರಾಮದ ಪ್ರಗತಿ, ಈಗ ನಿಮ್ಮ ಕೈಯಲ್ಲಿ.", en: "Your village's progress, now in your hands." },
  welcome_sub: { kn: "ಪ್ರತಿ ಯೋಜನೆ, ಪ್ರತಿ ರೂಪಾಯಿ, ಪ್ರತಿ ಹಂತ — ಎಲ್ಲವೂ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ. ಪ್ರಾರಂಭಿಸಲು ಪ್ರವೇಶಿಸಿ.", en: "Every project, every rupee, every milestone — in one place. Step in to begin." },
  enter_app: { kn: "ಪೋರ್ಟಲ್ ಪ್ರವೇಶಿಸಿ", en: "Enter the Portal" },
  feat_1_t: { kn: "ನೈಜ-ಸಮಯ ಪ್ರಗತಿ", en: "Real-time Progress" },
  feat_1_d: { kn: "ಪ್ರತಿ ಕಾಮಗಾರಿಯ ಪ್ರಗತಿಯನ್ನು ಶೇಕಡಾವಾರು ನೋಡಿ.", en: "See each work's progress as a live percentage." },
  feat_2_t: { kn: "ಬಜೆಟ್ ಪಾರದರ್ಶಕತೆ", en: "Budget Transparency" },
  feat_2_d: { kn: "ಬಜೆಟ್ ಮತ್ತು ಖರ್ಚು ಸ್ಪಷ್ಟ.", en: "Budget vs spend, fully visible to all." },
  feat_3_t: { kn: "ನಾಗರಿಕ ಧ್ವನಿ", en: "Citizen Voice" },
  feat_3_d: { kn: "ರೇಟ್ ಮಾಡಿ, ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ.", en: "Rate works and report issues directly." },

  /* Sidebar */
  nav_overview: { kn: "ಒಟ್ಟು ನೋಟ", en: "Overview" },
  nav_ongoing: { kn: "ನಡೆಯುತ್ತಿರುವ", en: "Ongoing" },
  nav_pending: { kn: "ಬಾಕಿ", en: "Pending" },
  nav_completed: { kn: "ಪೂರ್ಣಗೊಂಡ", en: "Completed" },
  nav_ratings: { kn: "ರೇಟಿಂಗ್ ಫಲಕ", en: "Rating Board" },
  nav_section: { kn: "ಯೋಜನೆಗಳು", en: "Projects" },

  /* Section pages */
  page_ongoing_title: { kn: "ನಡೆಯುತ್ತಿರುವ ಕಾಮಗಾರಿಗಳು", en: "Ongoing Works" },
  page_ongoing_sub: { kn: "ಪ್ರಸ್ತುತ ಕಾರ್ಯಗತಗೊಳ್ಳುತ್ತಿರುವ ಯೋಜನೆಗಳು.", en: "Projects currently being executed on the ground." },
  page_pending_title: { kn: "ಬಾಕಿ ಕಾಮಗಾರಿಗಳು", en: "Pending Works" },
  page_pending_sub: { kn: "ಯೋಜಿತ ಅಥವಾ ವಿಳಂಬವಾಗಿರುವ ಯೋಜನೆಗಳು.", en: "Projects that are planned or currently delayed." },
  page_completed_title: { kn: "ಪೂರ್ಣಗೊಂಡ ಕಾಮಗಾರಿಗಳು", en: "Completed Works" },
  page_completed_sub: { kn: "ಯಶಸ್ವಿಯಾಗಿ ಮುಗಿದ ಯೋಜನೆಗಳು.", en: "Projects successfully delivered to the community." },
  page_ratings_title: { kn: "ರೇಟಿಂಗ್ ಫಲಕ", en: "Rating Board" },
  page_ratings_sub: { kn: "ನಾಗರಿಕರು ನೀಡಿದ ರೇಟಿಂಗ್‌ಗಳ ಆಧಾರದ ಮೇಲೆ ಶ್ರೇಣಿ.", en: "Ranked by what the community thinks." },
  no_works: { kn: "ಈ ವಿಭಾಗದಲ್ಲಿ ಯಾವುದೇ ಕಾಮಗಾರಿ ಇಲ್ಲ.", en: "No works in this section." },
  rank: { kn: "ಶ್ರೇಣಿ", en: "Rank" },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof DICT) => string;
  tx: (b: { kn: string; en: string }) => string;
}

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "kn";
    return (localStorage.getItem("gs_lang") as Lang) || "kn";
  });

  useEffect(() => {
    localStorage.setItem("gs_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: setLangState,
      t: (key) => DICT[key]?.[lang] ?? String(key),
      tx: (b) => b[lang] ?? b.en,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}