import { motion } from "framer-motion";
import { FiArrowRight, FiTruck, FiRefreshCw, FiShield, FiHeadphones } from "react-icons/fi";
import Button from "../ui/Button";
import SmartImage from "../ui/SmartImage";
import { fadeUp, stagger, viewportOnce } from "../../hooks/useScrollReveal";

const perks = [
  { icon: <FiTruck />, title: "Free shipping", desc: "On all orders over $250" },
  { icon: <FiRefreshCw />, title: "30-day returns", desc: "Free & easy returns" },
  { icon: <FiShield />, title: "2-year warranty", desc: "On every NOVA piece" },
  { icon: <FiHeadphones />, title: "24/7 concierge", desc: "Always here to help" },
];

export default function Promo() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8">
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {perks.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            className="flex items-center gap-4 rounded-2xl border border-app surface p-5"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-xl text-brand-500">
              {p.icon}
            </span>
            <div>
              <p className="text-sm font-semibold">{p.title}</p>
              <p className="text-xs text-muted">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export function EditorialBanner() {
  const img = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80";
  return (
    <section className="mx-auto my-20 max-w-7xl px-5 sm:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-app">
        <SmartImage src={img} alt="Editorial" className="h-[420px] w-full md:h-[520px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/40 to-transparent" />
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="absolute inset-y-0 left-0 flex max-w-lg flex-col justify-center p-8 md:p-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">The SS26 Edit</span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
            Designed to be<br />worn for decades.
          </h2>
          <p className="mt-4 max-w-sm text-white/70">
            Discover the collection that's redefining quiet luxury — one impeccable detail at a time.
          </p>
          <div className="mt-8">
            <Button to="/shop" size="lg">Shop the edit <FiArrowRight /></Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
