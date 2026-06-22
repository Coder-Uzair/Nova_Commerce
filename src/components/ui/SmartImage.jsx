import { useState } from "react";
import { cn } from "../../utils/format";

// Image that gracefully falls back to a branded gradient + monogram when the
// source fails to load (e.g. in the offline preview iframe).
export default function SmartImage({ src, alt, className, seed = 0, rounded = "" }) {
  const [status, setStatus] = useState("loading");

  const grads = [
    "linear-gradient(135deg,#1c1c2b,#2a2240)",
    "linear-gradient(135deg,#2a2240,#3a1f33)",
    "linear-gradient(135deg,#16162a,#241a30)",
    "linear-gradient(135deg,#22203a,#3a2438)",
  ];
  const fallbackBg = grads[Math.abs(seed) % grads.length];

  return (
    <div className={cn("relative overflow-hidden", rounded, className)} style={{ background: "var(--surface-2)" }}>
      {status !== "loaded" && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: fallbackBg }}
        >
          {status === "error" ? (
            <span className="font-serif text-3xl tracking-tight text-white/30">N</span>
          ) : (
            <div className="skeleton absolute inset-0" />
          )}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-700",
          status === "loaded" ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
