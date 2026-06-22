import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-[var(--border)] overflow-hidden rounded-3xl border border-app surface">
      {items.map((it, i) => {
        const active = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(active ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-[var(--surface-2)]"
            >
              <span className="text-base font-medium md:text-lg">{it.q}</span>
              <motion.span animate={{ rotate: active ? 45 : 0 }} className="text-brand-500">
                <FiPlus size={20} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-soft leading-relaxed">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
