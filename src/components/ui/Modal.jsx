import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useLockBody } from "../../hooks/useLockBody";
import { cn } from "../../utils/format";

export default function Modal({ open, onClose, children, className }) {
  useLockBody(open);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={cn(
              "relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl surface border border-app shadow-glow",
              className
            )}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full glass text-[var(--text)] transition hover:scale-105"
            >
              <FiX />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
