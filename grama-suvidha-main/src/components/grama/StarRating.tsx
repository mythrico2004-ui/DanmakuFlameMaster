import { Star } from "lucide-react";
import { useState } from "react";

interface Props {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ value, onChange, readOnly, size = "md" }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
  const sz = size === "lg" ? "h-7 w-7" : size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = display >= n;
        const half = !filled && display >= n - 0.5;
        return (
          <button
            key={n}
            type="button"
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(n)}
            onMouseLeave={() => !readOnly && setHover(null)}
            onClick={() => !readOnly && onChange?.(n)}
            className={`relative ${readOnly ? "cursor-default" : "cursor-pointer transition-smooth hover:scale-110"}`}
            aria-label={`${n} stars`}
          >
            <Star
              className={`${sz} ${filled ? "fill-accent text-accent" : half ? "fill-accent/50 text-accent" : "fill-transparent text-muted-foreground/40"}`}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}