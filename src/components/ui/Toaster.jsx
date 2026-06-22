import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";
import { useToastStore } from "../../store/useToastStore";

const icons = {
  success: <FiCheckCircle className="text-emerald-400" />,
  error: <FiAlertCircle className="text-rose-400" />,
  info: <FiInfo className="text-brand-500" />,
};

export default function Toaster() {
  const { toasts, dismiss } = useToastStore();
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[200] flex w-[min(92vw,360px)] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="glass pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-3 shadow-soft"
          >
            <span className="text-lg">{icons[t.type]}</span>
            <p className="flex-1 text-sm font-medium">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="text-muted hover:text-[var(--text)]">
              <FiX />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
