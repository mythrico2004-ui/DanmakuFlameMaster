import { Link } from "react-router-dom";
import { Star, Trophy } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { useLang } from "@/i18n/LanguageContext";
import { StarRating } from "@/components/grama/StarRating";
import { StatusBadge } from "@/components/grama/StatusBadge";

export default function Ratings() {
  const { t, tx } = useLang();
  const ranked = [...PROJECTS].sort((a, b) => b.rating - a.rating);

  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-start gap-4">
        <div className="bg-hero flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-primary-foreground shadow-elevated">
          <Star className="h-6 w-6" />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{ranked.length} works ranked</p>
          <h1 className="font-display text-3xl font-black text-secondary md:text-5xl">{t("page_ratings_title")}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{t("page_ratings_sub")}</p>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <ol>
          {ranked.map((p, i) => {
            const top = i < 3;
            return (
              <li key={p.id} className="border-b border-border last:border-0">
                <Link
                  to={`/project/${p.id}`}
                  className="group flex items-center gap-4 p-4 transition-smooth hover:bg-muted/40 md:p-5"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-xl font-black ${
                      i === 0
                        ? "bg-accent text-accent-foreground shadow-glow"
                        : top
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {top ? <Trophy className="h-5 w-5" /> : i + 1}
                  </div>

                  <img
                    src={p.afterImage}
                    alt=""
                    loading="lazy"
                    width={120}
                    height={80}
                    className="hidden h-16 w-24 rounded-lg object-cover sm:block"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{p.code}</p>
                      <StatusBadge status={p.status} />
                    </div>
                    <h3 className="mt-0.5 truncate font-display text-lg font-bold text-secondary md:text-xl">
                      {tx(p.title)}
                    </h3>
                    <p className="truncate text-xs text-muted-foreground">{tx(p.ward)}</p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-display text-2xl font-black text-foreground">{p.rating.toFixed(1)}</span>
                      <StarRating value={p.rating} readOnly size="sm" />
                    </div>
                    <p className="text-[11px] text-muted-foreground">{p.ratingCount} {t("ratings")}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}