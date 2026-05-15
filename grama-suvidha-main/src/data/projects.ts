import roadBefore from "@/assets/road-before.jpg";
import roadAfter from "@/assets/road-after.jpg";
import pondBefore from "@/assets/pond-before.jpg";
import pondAfter from "@/assets/pond-after.jpg";
import hallBefore from "@/assets/hall-before.jpg";
import hallAfter from "@/assets/hall-after.jpg";
import borewellBefore from "@/assets/borewell-before.jpg";
import borewellAfter from "@/assets/borewell-after.jpg";
import schoolBefore from "@/assets/school-before.jpg";
import schoolAfter from "@/assets/school-after.jpg";
import lightBefore from "@/assets/light-before.jpg";
import lightAfter from "@/assets/light-after.jpg";

/**
 * Mock API structure (v1) — also exported as JSON for documentation.
 * Endpoint shape (future): GET /api/v1/panchayat/{id}/projects
 */
export type ProjectStatus = "planned" | "in_progress" | "delayed" | "completed";
export type ProjectCategory = "road" | "water" | "civic" | "education" | "energy";

export interface ProjectUpdate {
  date: string;          // ISO
  title: { kn: string; en: string };
  note?: { kn: string; en: string };
}

export interface Project {
  id: string;
  code: string;                                    // e.g. GS-2025-014
  title: { kn: string; en: string };
  category: ProjectCategory;
  status: ProjectStatus;
  progress: number;                                // 0 – 100
  budgetINR: number;
  spentINR: number;
  startDate: string;                               // ISO
  expectedCompletion: string;                      // ISO
  contractor: { kn: string; en: string };
  ward: { kn: string; en: string };
  description: { kn: string; en: string };
  beforeImage: string;
  afterImage: string;
  updates: ProjectUpdate[];
  rating: number;                                  // 0 – 5
  ratingCount: number;
}

export const PROJECTS: Project[] = [
  {
    id: "p-001",
    code: "GS-2025-014",
    title: { kn: "ಮುಖ್ಯ ರಸ್ತೆ ದುರಸ್ತಿ", en: "Main Road Repair" },
    category: "road",
    status: "in_progress",
    progress: 62,
    budgetINR: 1850000,
    spentINR: 1147000,
    startDate: "2026-01-12",
    expectedCompletion: "2026-06-30",
    contractor: { kn: "ಶ್ರೀ ಗಣೇಶ ಕನ್‌ಸ್ಟ್ರಕ್ಷನ್ಸ್", en: "Sri Ganesha Constructions" },
    ward: { kn: "ವಾರ್ಡ್ 3 — ಬಸವನಗುಡಿ", en: "Ward 3 — Basavanagudi" },
    description: {
      kn: "ಮುಖ್ಯ ಗ್ರಾಮ ರಸ್ತೆಯ 1.8 ಕಿ.ಮೀ ಡಾಂಬರೀಕರಣ ಮತ್ತು ಚರಂಡಿ ನಿರ್ಮಾಣ.",
      en: "Resurfacing 1.8 km of main village road with new drainage on both sides.",
    },
    beforeImage: roadBefore,
    afterImage: roadAfter,
    updates: [
      { date: "2026-04-22", title: { kn: "ಡಾಂಬರೀಕರಣ 60% ಮುಗಿದಿದೆ", en: "Asphalting 60% done" } },
      { date: "2026-03-08", title: { kn: "ಚರಂಡಿ ಕಾಮಗಾರಿ ಪ್ರಾರಂಭ", en: "Drainage work started" } },
      { date: "2026-01-12", title: { kn: "ಭೂಮಿ ಪೂಜೆ ಮತ್ತು ಆರಂಭ", en: "Bhoomi puja & kickoff" } },
    ],
    rating: 4.2,
    ratingCount: 128,
  },
  {
    id: "p-002",
    code: "GS-2025-021",
    title: { kn: "ಊರಿನ ಕೆರೆ ಪುನಶ್ಚೇತನ", en: "Village Pond Rejuvenation" },
    category: "water",
    status: "completed",
    progress: 100,
    budgetINR: 920000,
    spentINR: 905000,
    startDate: "2025-09-01",
    expectedCompletion: "2026-02-28",
    contractor: { kn: "ಜಲ ಸಂರಕ್ಷಣಾ ಸಮಿತಿ", en: "Jala Samrakshana Samiti" },
    ward: { kn: "ವಾರ್ಡ್ 1 — ಕೆರೆ ಬೀದಿ", en: "Ward 1 — Kere Beedi" },
    description: {
      kn: "ಹೂಳೆತ್ತುವಿಕೆ, ಕಲ್ಲಿನ ಮೆಟ್ಟಿಲು, ಮತ್ತು ಸುತ್ತ ಹಸಿರೀಕರಣ.",
      en: "Desilting, stone ghat construction and surrounding plantation.",
    },
    beforeImage: pondBefore,
    afterImage: pondAfter,
    updates: [
      { date: "2026-02-26", title: { kn: "ಲೋಕಾರ್ಪಣೆ ಸಮಾರಂಭ", en: "Inaugurated by community" } },
      { date: "2026-01-15", title: { kn: "ಮೆಟ್ಟಿಲು ನಿರ್ಮಾಣ ಮುಕ್ತಾಯ", en: "Ghat steps completed" } },
    ],
    rating: 4.8,
    ratingCount: 312,
  },
  {
    id: "p-003",
    code: "GS-2025-033",
    title: { kn: "ಸಮುದಾಯ ಭವನ ನಿರ್ಮಾಣ", en: "Community Hall Construction" },
    category: "civic",
    status: "in_progress",
    progress: 35,
    budgetINR: 4200000,
    spentINR: 1480000,
    startDate: "2025-11-20",
    expectedCompletion: "2026-12-15",
    contractor: { kn: "ಮಲ್ನಾಡ್ ಬಿಲ್ಡರ್ಸ್", en: "Malnad Builders Pvt Ltd" },
    ward: { kn: "ವಾರ್ಡ್ 5 — ಶಾಲಾ ಬಯಲು", en: "Ward 5 — School Maidan" },
    description: {
      kn: "300 ಜನರ ಸಾಮರ್ಥ್ಯದ ಸಭಾ ಭವನ, ಅಡುಗೆ ಕೋಣೆ ಮತ್ತು ವೇದಿಕೆ ಸಹಿತ.",
      en: "300-capacity multipurpose hall with kitchen and stage.",
    },
    beforeImage: hallBefore,
    afterImage: hallAfter,
    updates: [
      { date: "2026-04-10", title: { kn: "ಗೋಡೆಗಳ ಕಾಮಗಾರಿ ಶುರು", en: "Wall masonry begun" } },
      { date: "2026-02-02", title: { kn: "ಅಡಿಪಾಯ ಮುಕ್ತಾಯ", en: "Foundation completed" } },
    ],
    rating: 3.9,
    ratingCount: 84,
  },
  {
    id: "p-004",
    code: "GS-2025-009",
    title: { kn: "ಬೋರ್‌ವೆಲ್ ಸ್ಥಾಪನೆ", en: "Borewell Installation" },
    category: "water",
    status: "completed",
    progress: 100,
    budgetINR: 280000,
    spentINR: 274500,
    startDate: "2025-12-05",
    expectedCompletion: "2026-01-20",
    contractor: { kn: "ಶಕ್ತಿ ಡ್ರಿಲ್ಲರ್ಸ್", en: "Shakti Drillers" },
    ward: { kn: "ವಾರ್ಡ್ 2 — ಹೊಲದ ಗದ್ದೆ", en: "Ward 2 — Holada Gadde" },
    description: {
      kn: "ರೈತರಿಗೆ ನೀರಾವರಿಗಾಗಿ 450 ಅಡಿ ಆಳದ ಬೋರ್‌ವೆಲ್.",
      en: "450 ft deep borewell for farmer irrigation needs.",
    },
    beforeImage: borewellBefore,
    afterImage: borewellAfter,
    updates: [
      { date: "2026-01-18", title: { kn: "ನೀರು ಪೂರೈಕೆ ಆರಂಭ", en: "Water supply commenced" } },
    ],
    rating: 4.6,
    ratingCount: 96,
  },
  {
    id: "p-005",
    code: "GS-2025-040",
    title: { kn: "ಸರ್ಕಾರಿ ಶಾಲೆ ನವೀಕರಣ", en: "Govt School Renovation" },
    category: "education",
    status: "delayed",
    progress: 48,
    budgetINR: 1650000,
    spentINR: 790000,
    startDate: "2025-10-15",
    expectedCompletion: "2026-03-30",
    contractor: { kn: "ವಿದ್ಯಾ ಇನ್‌ಫ್ರಾ", en: "Vidya Infra Solutions" },
    ward: { kn: "ವಾರ್ಡ್ 4 — ಶಾಲಾ ಬೀದಿ", en: "Ward 4 — School Street" },
    description: {
      kn: "ಮಾಡು ದುರಸ್ತಿ, ಶೌಚಾಲಯ, ಮತ್ತು ಗೋಡೆಗಳ ಚಿತ್ರಕಲೆ.",
      en: "Roof repair, new toilets and educational wall murals.",
    },
    beforeImage: schoolBefore,
    afterImage: schoolAfter,
    updates: [
      { date: "2026-04-01", title: { kn: "ಮಳೆಯಿಂದಾಗಿ ವಿಳಂಬ", en: "Delayed due to monsoon" } },
      { date: "2026-01-22", title: { kn: "ಶೌಚಾಲಯ ಮುಕ್ತಾಯ", en: "Toilet block complete" } },
    ],
    rating: 3.4,
    ratingCount: 211,
  },
  {
    id: "p-006",
    code: "GS-2025-052",
    title: { kn: "ಸೌರ ಬೀದಿ ದೀಪಗಳು", en: "Solar Street Lighting" },
    category: "energy",
    status: "in_progress",
    progress: 78,
    budgetINR: 640000,
    spentINR: 498000,
    startDate: "2026-02-01",
    expectedCompletion: "2026-05-20",
    contractor: { kn: "ಸೂರ್ಯ ಎನರ್ಜಿ", en: "Soorya Energy Pvt Ltd" },
    ward: { kn: "ಎಲ್ಲಾ ವಾರ್ಡ್‌ಗಳು", en: "All Wards" },
    description: {
      kn: "32 ಸೌರಶಕ್ತಿ ಚಾಲಿತ ಎಲ್‌ಇಡಿ ಬೀದಿ ದೀಪಗಳ ಸ್ಥಾಪನೆ.",
      en: "Installation of 32 solar-powered LED street lights village-wide.",
    },
    beforeImage: lightBefore,
    afterImage: lightAfter,
    updates: [
      { date: "2026-04-18", title: { kn: "25 ದೀಪಗಳ ಸ್ಥಾಪನೆ ಪೂರ್ಣ", en: "25 lights installed" } },
      { date: "2026-03-05", title: { kn: "ಧ್ರುವಗಳ ಅಳವಡಿಕೆ", en: "Pole installation phase" } },
    ],
    rating: 4.5,
    ratingCount: 67,
  },
];