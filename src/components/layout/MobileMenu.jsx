import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FiX, FiUser, FiHeart, FiPackage } from "react-icons/fi";
import { useEffect } from "react";
import { navLinks } from "../../utils/constants";
import { useLockBody } from "../../hooks/useLockBody";
import ThemeToggle from "../ui/ThemeToggle";

const extraLinks = [
  { label: "Wishlist", to: "/wishlist", icon: <FiHeart /> },
  { label: "Dashboard", to: "/dashboard", icon: <FiUser /> },
  { label: "Track Order", to: "/track", icon: <FiPackage /> },
];

export default function MobileMenu({ open, onClose }) {
  useLockBody(open);
  const { pathname } = useLocation();
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute left-0 top-0 flex h-full w-[82%] max-w-sm flex-col surface border-r border-app p-6"
          >
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 font-serif text-lg font-bold text-white">
                  N
                </span>
                <span className="font-serif text-xl font-bold">NOVA</span>
              </Link>
              <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-[var(--surface-2)]">
                <FiX size={20} />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                >
                  <Link
                    to={l.to}
                    className="block rounded-2xl px-4 py-3.5 font-serif text-2xl font-medium transition hover:bg-[var(--surface-2)]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-6 space-y-1 border-t border-app pt-6">
              {extraLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-soft transition hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                >
                  <span className="text-brand-500">{l.icon}</span> {l.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-app pt-6">
              <span className="text-sm text-muted">Appearance</span>
              <ThemeToggle />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
