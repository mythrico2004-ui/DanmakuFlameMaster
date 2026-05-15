interface Props {
  value: number;
  showLabel?: boolean;
}
export function ProgressBar({ value, showLabel = true }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full">
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="bg-progress relative h-full rounded-full animate-fill"
          style={{ width: `${pct}%` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,hsl(var(--background)/0.4),transparent)] opacity-50" />
        </div>
      </div>
      {showLabel && (
        <div className="mt-1.5 flex items-center justify-between text-xs">
          <span className="font-mono font-semibold text-secondary">{pct}%</span>
        </div>
      )}
    </div>
  );
}