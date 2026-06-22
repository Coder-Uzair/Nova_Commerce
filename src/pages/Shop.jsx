import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSliders, FiX, FiCheck } from "react-icons/fi";
import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/layout/PageTransition";
import ProductGrid from "../components/product/ProductGrid";
import Button from "../components/ui/Button";
import { productService } from "../services/api";
import { categories } from "../data/products";
import { sortOptions } from "../utils/constants";
import { formatPrice, cn } from "../utils/format";

export default function Shop() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCats, setActiveCats] = useState([]);
  const [maxPrice, setMaxPrice] = useState(600);
  const [sort, setSort] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    productService.list().then((data) => {
      setAll(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let list = all.filter((p) => p.price <= maxPrice);
    if (activeCats.length) list = list.filter((p) => activeCats.includes(p.category));
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest": list = [...list].sort((a, b) => (b.tags.includes("new") ? 1 : 0) - (a.tags.includes("new") ? 1 : 0)); break;
      default: list = [...list].sort((a, b) => (b.tags.includes("featured") ? 1 : 0) - (a.tags.includes("featured") ? 1 : 0));
    }
    return list;
  }, [all, activeCats, maxPrice, sort]);

  const toggleCat = (id) =>
    setActiveCats((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const reset = () => { setActiveCats([]); setMaxPrice(600); setSort("featured"); };

  const Filters = (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Categories</h3>
          {activeCats.length > 0 && (
            <button onClick={() => setActiveCats([])} className="text-xs text-brand-500">Clear</button>
          )}
        </div>
        <div className="space-y-1.5">
          {categories.map((c) => {
            const active = activeCats.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleCat(c.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition",
                  active ? "bg-brand-500/10 text-brand-500" : "hover:bg-[var(--surface-2)]"
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span className={cn(
                    "grid h-5 w-5 place-items-center rounded-md border transition",
                    active ? "border-brand-500 bg-brand-500 text-white" : "border-app"
                  )}>
                    {active && <FiCheck size={13} />}
                  </span>
                  {c.name}
                </span>
                <span className="text-xs text-muted">{c.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Max price</h3>
        <input
          type="range"
          min={100}
          max={600}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--color-brand-500)]"
        />
        <div className="mt-2 flex justify-between text-sm text-muted">
          <span>$100</span>
          <span className="font-semibold text-[var(--text)]">{formatPrice(maxPrice)}</span>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={reset}>Reset filters</Button>
    </div>
  );

  return (
    <PageTransition>
      <PageHeader
        title="The Collection"
        subtitle="Every piece, considered. Browse the full NOVA catalogue."
        crumbs={[{ label: "Home", to: "/" }, { label: "Shop" }]}
      />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-app surface p-6">{Filters}</div>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-soft">
                <span className="font-semibold text-[var(--text)]">{filtered.length}</span> products
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFilterOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-app px-4 py-2 text-sm lg:hidden"
                >
                  <FiSliders size={16} /> Filters
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-full border border-app surface px-4 py-2 text-sm outline-none"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {activeCats.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {activeCats.map((id) => (
                  <button
                    key={id}
                    onClick={() => toggleCat(id)}
                    className="flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1.5 text-sm capitalize text-brand-500"
                  >
                    {id} <FiX size={14} />
                  </button>
                ))}
              </div>
            )}

            <ProductGrid products={filtered} loading={loading} cols="lg:grid-cols-3 xl:grid-cols-3" count={9} />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filterOpen && (
          <div className="fixed inset-0 z-[120] lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)} className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl surface p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold">Filters</h3>
                <button onClick={() => setFilterOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--surface-2)]"><FiX /></button>
              </div>
              {Filters}
              <Button className="mt-6 w-full" onClick={() => setFilterOpen(false)}>Show {filtered.length} results</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
