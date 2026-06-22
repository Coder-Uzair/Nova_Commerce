import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../hooks/useScrollReveal";
import { cn } from "../../utils/format";

export default function Section({ children, className, container = true }) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className={cn(container && "mx-auto w-full max-w-7xl px-5 sm:px-8")}>{children}</div>
    </section>
  );
}

export function SectionHeading({ overline, title, subtitle, align = "center", className }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {overline && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
          {overline}
        </span>
      )}
      <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-soft md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}
