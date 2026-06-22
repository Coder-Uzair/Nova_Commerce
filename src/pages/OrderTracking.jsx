import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiPackage, FiTruck, FiHome, FiSearch, FiMapPin } from "react-icons/fi";
import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/layout/PageTransition";
import Button from "../components/ui/Button";
import SmartImage from "../components/ui/SmartImage";
import { products } from "../data/products";
import { formatPrice } from "../utils/format";

const stages = [
  { key: "confirmed", label: "Order confirmed", icon: <FiCheck />, date: "Jun 19, 9:24 AM", done: true },
  { key: "processed", label: "Processed at atelier", icon: <FiPackage />, date: "Jun 20, 2:10 PM", done: true },
  { key: "transit", label: "In transit", icon: <FiTruck />, date: "Jun 21, 8:45 AM", done: true },
  { key: "delivered", label: "Out for delivery", icon: <FiHome />, date: "Est. Jun 23", done: false },
];

export default function OrderTracking() {
  const [query, setQuery] = useState("NV-83104");
  const item = products[0];

  return (
    <PageTransition>
      <PageHeader title="Track your order" subtitle="Real-time updates from our atelier to your door." crumbs={[{ label: "Home", to: "/" }, { label: "Track Order" }]} />
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <div className="flex gap-2 rounded-full border border-app surface p-1.5">
          <div className="flex flex-1 items-center gap-2 px-4">
            <FiSearch className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your order number"
              className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted"
            />
          </div>
          <Button>Track</Button>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-3xl border border-app surface p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-app pb-6">
            <div>
              <p className="text-sm text-muted">Order number</p>
              <p className="font-serif text-xl font-semibold">{query.toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted">Estimated delivery</p>
              <p className="font-semibold text-brand-500">Tuesday, Jun 23</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8">
            {stages.map((s, i) => (
              <div key={s.key} className="relative flex gap-4 pb-8 last:pb-0">
                {i < stages.length - 1 && (
                  <div className={`absolute left-[19px] top-10 h-full w-0.5 ${s.done ? "bg-brand-500" : "bg-[var(--border)]"}`} />
                )}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.12, type: "spring" }}
                  className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                    s.done ? "bg-gradient-to-br from-brand-600 to-accent-500 text-white" : "border-2 border-app text-muted surface"
                  }`}
                >
                  {s.icon}
                </motion.span>
                <div className="pt-1">
                  <p className={`font-medium ${s.done ? "" : "text-muted"}`}>{s.label}</p>
                  <p className="text-sm text-muted">{s.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping address */}
          <div className="mt-2 flex items-start gap-3 rounded-2xl surface-2 p-4">
            <FiMapPin className="mt-0.5 text-brand-500" />
            <div className="text-sm">
              <p className="font-medium">Shipping to</p>
              <p className="text-soft">Julian Mercer · 123 Madison Avenue, New York, NY 10016</p>
            </div>
          </div>

          {/* Item */}
          <div className="mt-6 flex items-center gap-4 border-t border-app pt-6">
            <SmartImage src={item.images[0]} alt={item.name} className="h-20 w-16 rounded-xl" />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted">Qty 1 · {item.sizes[1]}</p>
            </div>
            <span className="font-semibold">{formatPrice(item.price)}</span>
          </div>
        </motion.div>

        <div className="mt-6 text-center text-sm text-soft">
          Need help? <Button to="/contact" variant="ghost" size="sm">Contact support</Button>
        </div>
      </div>
    </PageTransition>
  );
}
