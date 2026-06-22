import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../../utils/format";

const base =
  "relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors duration-300 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "text-white bg-gradient-to-r from-brand-600 to-accent-500 hover:from-brand-500 hover:to-accent-500 shadow-[0_10px_30px_-10px_rgba(139,92,246,.6)]",
  solid: "bg-[var(--text)] text-[var(--bg)] hover:opacity-90",
  outline: "border border-app text-[var(--text)] hover:bg-[var(--surface-2)]",
  ghost: "text-[var(--text)] hover:bg-[var(--surface-2)]",
  glass: "glass text-[var(--text)] hover:bg-[var(--surface-2)]",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
  icon: "h-11 w-11",
};

const MLink = motion.create(Link);

export default function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 22 },
  };

  if (to) {
    return (
      <MLink to={to} className={cls} {...motionProps} {...props}>
        {children}
      </MLink>
    );
  }
  if (href) {
    return (
      <motion.a href={href} className={cls} {...motionProps} {...props}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button className={cls} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
