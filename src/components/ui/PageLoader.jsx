import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--border)]" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-brand-500)]" />
          <span className="absolute inset-0 grid place-items-center font-serif text-lg font-bold text-gradient">N</span>
        </div>
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-muted"
        >
          Curating your experience…
        </motion.p>
      </div>
    </div>
  );
}
