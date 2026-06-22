import { FiStar } from "react-icons/fi";
import { cn } from "../../utils/format";

export default function Rating({ value = 0, reviews, size = 14, className }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <FiStar
            key={i}
            size={size}
            className={i <= Math.round(value) ? "text-amber-400 fill-amber-400" : "text-ink-400/50"}
            style={i <= Math.round(value) ? { fill: "#fbbf24" } : {}}
          />
        ))}
      </div>
      <span className="text-xs text-muted">
        {value.toFixed(1)}{reviews != null && ` (${reviews})`}
      </span>
    </div>
  );
}
