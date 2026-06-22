import { cn } from "../../utils/format";

const tones = {
  brand: "bg-brand-500/15 text-brand-500 border-brand-500/20",
  accent: "bg-accent-500/15 text-accent-500 border-accent-500/20",
  neutral: "bg-[var(--surface-2)] text-soft border-app",
  dark: "bg-ink-950/80 text-white border-white/10",
};

export default function Badge({ children, tone = "brand", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
