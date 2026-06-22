import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiX, FiTrendingUp } from "react-icons/fi";
import SmartImage from "../ui/SmartImage";
import { useUIStore } from "../../store/useUIStore";
import { useLockBody } from "../../hooks/useLockBody";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/format";

const trending = ["Overcoat", "Cashmere", "Boots", "Watch"];

export default function SearchModal() {
  const { searchOpen, closeSearch } = useUIStore();
  const [q, setQ] = useState("");
  useLockBody(searchOpen);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!searchOpen) setQ("");
  }, [searchOpen]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return products
      .filter((p) => p.name.toLowerCase().includes(term) || p.category.includes(term) || p.brand.toLowerCase().includes(term))
      .slice(0, 6);
  }, [q]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <div className="fixed inset-0 z-[140] flex items-start justify-center p-4 pt-[12vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl surface border border-app shadow-glow"
          >
            <div className="flex items-center gap-3 border-b border-app px-5 py-4">
              <FiSearch size={20} className="text-muted" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for pieces, categories…"
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
              />
              <button onClick={closeSearch} className="grid h-8 w-8 place-items-center rounded-full hover:bg-[var(--surface-2)]">
                <FiX />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-4">
              {!q.trim() ? (
                <div>
                  <p className="mb-3 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <FiTrendingUp /> Trending searches
                  </p>
                  <div className="flex flex-wrap gap-2 px-2">
                    {trending.map((t) => (
                      <button
                        key={t}
                        onClick={() => setQ(t)}
                        className="rounded-full border border-app px-4 py-2 text-sm transition hover:bg-[var(--surface-2)]"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length ? (
                <ul className="space-y-1">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/product/${p.id}`}
                        onClick={closeSearch}
                        className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-[var(--surface-2)]"
                      >
                        <SmartImage src={p.images[0]} alt={p.name} className="h-14 w-14 shrink-0 rounded-xl" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-muted capitalize">{p.category}</p>
                        </div>
                        <span className="text-sm font-semibold">{formatPrice(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-2 py-8 text-center text-soft">No results for "{q}"</p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
